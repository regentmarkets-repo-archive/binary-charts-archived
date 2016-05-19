import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier2FromContract';
import timePlotLines from '../plot-lines/timePlotLines';

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

export default (chart, ticks, contract) => {
    if (!contract) return;

    updateExtremesXAxis(chart.xAxis[0], contract);
    updateExtremesYAxis(chart.yAxis[0], contract, ticks);
};
