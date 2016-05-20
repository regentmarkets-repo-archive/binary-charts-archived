import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier2FromContract';
import timePlotLines from '../plot-lines/timePlotLines';

import throttle from 'lodash.throttle';

const arrayMin = arr => Math.min.apply(Math, arr);
const arrayMax = arr => Math.max.apply(Math, arr);

let lastExtremesX = {};

const updateExtremesXAxis = (axis, contract) => {
    const timeEntries = timePlotLines
        .filter(x => contract[x.id])
        .map(x => contract[x.id] * 1000);

    if (timeEntries.length === 0) {
        return;
    }

    const min = arrayMin(timeEntries) - axis.tickInterval;
    const max = arrayMax(timeEntries) + axis.tickInterval;

    // console.log('Updating extremes on X', lastExtremesX, min, max);
    if (lastExtremesX.min !== min || lastExtremesX.max !== max) {
        lastExtremesX = { min, max };
        axis.setExtremes(min, max);
    }
};

let lastExtremesY = {};

const updateExtremesYAxis = (axis, contract, ticks) => {
    const lastTick = getLastTickQuote(ticks);

    if (!contract.barrier && !contract.barrier2 || contract.contract_type.includes('DIGIT')) {
        return;
    }
    const barrier1 = contract.barrier && barrierFromContract(contract, lastTick);
    const barrier2 = contract.barrier2 && barrier2FromContract(contract, lastTick);

    const allQuotes = ticks.map(t => t.quote);
    const minTick = arrayMin(allQuotes);
    const maxTick = arrayMax(allQuotes);

    const prevExtremes = axis.getExtremes();
    const minData = prevExtremes.dataMin || minTick;
    const maxData = prevExtremes.dataMax || maxTick;

    const extremes = [
        barrier1,
        barrier2,
        minData,
        maxData,
    ].filter(x => x || x === 0);

    const min = arrayMin(extremes);
    const max = arrayMax(extremes);

    if (lastExtremesY.min !== min || lastExtremesY.max !== max) {
        lastExtremesY = { min, max };
        axis.setExtremes(min, max);
    }
};

const updateExtremes = (chart, ticks, contract) => {
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

    const { low_barrier, high_barrier } = contract;
    const boundaries = [ticksMin, ticksMax, low_barrier, high_barrier].filter(x => x || x === 0);

    const nextMin = arrayMin(boundaries);
    const nextMax = arrayMax(boundaries);

    const yAxis = chart.yAxis[0];
    yAxis.setExtremes(nextMin, nextMax);
};

export default throttle(updateExtremes, 500);
