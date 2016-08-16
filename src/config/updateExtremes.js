import { arrayMin, arrayMax, durationToSecs, getLastTick } from 'binary-utils';
import { patchNullDataForStartLaterContract } from './updateTicks';

const hcUnitConverter = type => {
    switch (type) {
        case 'second': return 's';
        case 'minute': return 'm';
        case 'hour': return 'h';
        case 'day': return 'd';
        default: return 'd';
    }
};

export const updateExtremesXAxis = (chart, contract = {}, rangeButton) => {
    const series = chart.series[0];
    const chartType = series.type;

    if (chartType !== 'area') return;

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
            const dataWithNull = patchNullDataForStartLaterContract(chart, contract, dataFromChart);
            const { min } = xAxis.getExtremes();

            const newMax = getLastTick(dataWithNull)[0];
            series.setData(dataWithNull, false);
            window.setTimeout(() => xAxis.setExtremes(min, newMax), 100);
        } else if (rangeButton) {
            const { count, type } = rangeButton;
            const durationInSecs = durationToSecs(count, hcUnitConverter(type));
            const validMax = dataFromChart.reduce((a, b) => {
                if (b[1]) {
                    return Math.max(a, b[0]);
                }
                return a;
            }, 0);
            const { dataMax } = xAxis.getExtremes();
            window.setTimeout(() => xAxis.setExtremes(validMax - (durationInSecs * 1000), dataMax), 100);
        }
    } else {
        removeSeriesNullData();
    }
};

export const updateExtremesYAxis = (chart, contract = {}) => {
    const xAxis = chart.xAxis[0];

    const { min, dataMin, max } = xAxis.getExtremes();

    const xMin = Math.max(min, dataMin);
    const xMax = max;

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

    // if (chart.renderTo.id === 'trade-chart1') {
    //     console.groupCollapsed();
    //     console.log('xmin', xMin);
    //     console.log('xmax', xMax);
    //     console.log('b', boundaries);
    //     console.groupEnd();
    // }
    if (chart.options.binary.lastYExtremes.min !== nextMin || chart.options.binary.lastYExtremes.max !== nextMax) {
        yAxis.setExtremes(nextMin, nextMax, false);
        chart.options.binary.lastYExtremes.min = nextMin;
        chart.options.binary.lastYExtremes.max = nextMax;
    }
};

const updateExtremes = (chart, contract, rangeButton) => {
    updateExtremesXAxis(chart, contract, rangeButton);
    updateExtremesYAxis(chart, contract);
};

export default updateExtremes;
