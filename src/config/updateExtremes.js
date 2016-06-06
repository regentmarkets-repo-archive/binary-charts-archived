import getLastTick from 'binary-utils/lib/getLastTick';

const arrayMin = arr => Math.min.apply(Math, arr);
const arrayMax = arr => Math.max.apply(Math, arr);

export const updateExtremesXAxis = (chart, ticks, contract) => {
    const lastTickEpoch = getLastTick(ticks) && getLastTick(ticks).epoch;
    const startTime = contract && contract.date_start;
    if (!lastTickEpoch || !startTime) {
        return;
    }

    if (lastTickEpoch < startTime) {
        const series = chart.series[0];
        const xAxis = chart.xAxis[0];
        const max = startTime * 1000 + 3000;
        series.addPoint([max, null], false);
        xAxis.setExtremes(undefined, max, false);
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
    updateExtremesYAxis(chart, ticks, contract);
    updateExtremesXAxis(chart, ticks, contract);
};

export default updateExtremes;
