import arrayMin from 'binary-utils/lib/arrayMin';
import arrayMax from 'binary-utils/lib/arrayMax';

export const updateExtremesXAxis = (chart, contract = {}) => {
    const series = chart.series[0];
    const type = series.type;

    if (type !== 'area') return;

    const dataFromChart = series.options.data;
    const lastTickMillis = dataFromChart[dataFromChart.length - 1] && dataFromChart[dataFromChart.length - 1][0];
    const startTime = contract && contract.date_start;
    const startTimeMillis = startTime && startTime * 1000;

    function removeSeriesNullData() {
        const removeNull = series.options.data.filter(d => !!d[1] || d[1] === 0);
        if (removeNull.length !== series.options.data.length) {
            series.setData(removeNull, false);
        }
    }

    // Special case, data not loaded or contract not loaded
    if (!lastTickMillis || !startTime) {
        removeSeriesNullData();
        return;
    }

    const startTimeDataPoint = dataFromChart.find(d => {
        const dataOlderThanStartTime = d[0] > startTimeMillis;
        return dataOlderThanStartTime;
    });
    const startInFuture = !startTimeDataPoint || !startTimeDataPoint[1];
    const xAxis = chart.xAxis[0];

    if (startInFuture) {
        const hasFutureData = !!startTimeDataPoint;
        if (!hasFutureData) {
            const { min, max } = xAxis.getExtremes();

            const visiblePointCount = dataFromChart.filter(d => d[0] > min && d[0] < max).length;
            const emptyDataCount = visiblePointCount * 0.1;         // keep 10% space for empty data

            const blankWindowSize = startTimeMillis - lastTickMillis;
            const blankWindowInterval = blankWindowSize / (emptyDataCount * 0.5);

            let newSeries = dataFromChart;
            let newMax = startTimeMillis;
            for (let i = 1; i <= emptyDataCount; i++) {
                const futurePoint = [lastTickMillis + (blankWindowInterval * i), null];
                newSeries.push(futurePoint);
                newMax = futurePoint[0];
            }
            series.setData(newSeries, false);
            setTimeout(() => xAxis.setExtremes(min, newMax), 100);
        }
    } else {
        removeSeriesNullData();
    }
};

let lastExtremesY = {};
export const updateExtremesYAxis = (chart, contract = {}) => {
    const xAxis = chart.xAxis[0];

    const { min, dataMin } = xAxis.getExtremes();

    const xMin = Math.max(min, dataMin);
    const xMax = xAxis.getExtremes().max;

    const zoomedTicks = chart.series[0].options.data
        .filter(t => {
            const valueValid = !!t[1] || t[1] === 0;
            const withinRange = t[0] >= xMin && t[0] <= xMax;
            return valueValid && withinRange;
        });

    let ticksMin = 0;
    let ticksMax = 0;
    if (chart.series[0].type === 'area') {
        const quotes = zoomedTicks.map(t => +(t[1]));
        ticksMax = arrayMax(quotes);
        ticksMin = arrayMin(quotes);
    } else if (chart.series[0].type === 'candlestick') {
        const highLow = zoomedTicks.map(t => [+(t[1]), +(t[2])]).reduce((a, b) => a.concat(b), []);
        ticksMax = arrayMax(highLow);
        ticksMin = arrayMin(highLow);
    }

    let boundaries = [];
    // digit's barrier are not used to set extremes
    if (contract.contract_type && contract.contract_type.includes('DIGIT')) {
        boundaries = [
            ticksMin,
            ticksMax,
        ].filter(x => x || x === 0);
    } else {
        boundaries = [
            ticksMin,
            ticksMax,
            contract.barrier,
            contract.low_barrier,
            contract.high_barrier,
        ].filter(x => x || x === 0);
    }

    const visibleDataMin = arrayMin(boundaries);
    const visibleDataMax = arrayMax(boundaries);

    const upperBuffer = (visibleDataMax - visibleDataMin) * 0.05;      // more space to allow adding controls
    const lowerBuffer = (visibleDataMax - visibleDataMin) * 0.05;

    const nextMin = visibleDataMin - lowerBuffer;
    const nextMax = visibleDataMax + upperBuffer;

    const yAxis = chart.yAxis[0];

    // console.groupCollapsed();
    // console.log('t', ticks);
    // console.log('xax', xAxis);
    // console.log('xmin', xMin);
    // console.log('xmax', xMax);
    // console.log('z', zoomedTicks);
    // console.log('b', boundaries);
    // console.log('Ex Min', nextMin);
    // console.log('Ex Max', nextMax);
    // console.groupEnd();

    if (lastExtremesY.min !== nextMin || lastExtremesY.max !== nextMax) {
        yAxis.setExtremes(nextMin, nextMax, false);
        lastExtremesY.min = nextMin;
        lastExtremesY.max = nextMax;
    }
};

const updateExtremes = (chart, contract) => {
    updateExtremesXAxis(chart, contract);
    updateExtremesYAxis(chart, contract);
};

export default updateExtremes;
