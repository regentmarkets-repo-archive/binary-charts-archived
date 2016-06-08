import getLastTick from 'binary-utils/lib/getLastTick';

const arrayMin = arr => Math.min.apply(Math, arr);
const arrayMax = arr => Math.max.apply(Math, arr);

export const updateExtremesXAxis = (chart, ticks, contract) => {
    const lastTickEpoch = getLastTick(ticks) && getLastTick(ticks).epoch;
    const startTime = contract && contract.date_start;
    const series = chart.series[0];
    const type = series.type;

    if (type === 'area') {
        const removeNull = series.options.data.filter(d => !!d[1] || d[1] === 0);
        if (removeNull.length !== series.options.data.length) {
            series.setData(removeNull, false);
        }

        if (!lastTickEpoch || !startTime) {
            return;
        }

        if (lastTickEpoch < startTime) {
            const xAxis = chart.xAxis[0];
            const { min, max } = xAxis.getExtremes();
            const startTimeMillis = startTime * 1000;
            const lastTickMillis = lastTickEpoch * 1000;

            const visiblePointCount = series.options.data.filter(d => d[0] > min && d[0] < max).length;
            const emptyDataCount = visiblePointCount * 0.1;

            const blankWindowSize = startTimeMillis - lastTickMillis;
            const blankWindowInterval = blankWindowSize / (emptyDataCount * 0.5);

            for (let i = 1; i <= emptyDataCount; i++) {
                series.addPoint([lastTickMillis + (blankWindowInterval * i), null], false);
            }
            xAxis.setExtremes(undefined, startTimeMillis, false);
        }
    }
};

let lastExtremesY = {};
export const updateExtremesYAxis = (chart, ticks, contract) => {
    if (!contract) return;

    const xAxis = chart.xAxis[0];
    const xMin = xAxis.min;
    const xMax = xAxis.max;

    const zoomedTicks = ticks
        .filter(t => (t.epoch * 1000) > xMin && (t.epoch * 1000) < xMax);

    let ticksMin = 0;
    let ticksMax = 0;
    if (chart.series[0].type === 'area') {
        const quotes = zoomedTicks.map(t => +t.quote);
        ticksMax = arrayMax(quotes);
        ticksMin = arrayMin(quotes);
    } else if (chart.series[0].type === 'candlestick') {
        const highLow = zoomedTicks.map(t => [+t.high, +t.low]).reduce((a, b) => a.concat(b), []);
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

    const dataMin = arrayMin(boundaries);
    const dataMax = arrayMax(boundaries);

    const fivePercent = (dataMax - dataMin) * 0.05;

    const nextMin = dataMin - fivePercent;
    const nextMax = dataMax + fivePercent;

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

const updateExtremes = (chart, ticks, contract) => {
    updateExtremesXAxis(chart, ticks, contract);
    updateExtremesYAxis(chart, ticks, contract);
};

export default updateExtremes;
