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

const updateExtremesYAxis = (axis, contract, lastTick) => {
    if (!contract.barrier && !contract.barrier2 || contract.contract_type.includes('DIGIT')) {
        return;
    }
    const barrier1 = contract.barrier && barrierFromContract(contract, lastTick);
    const barrier2 = contract.barrier2 && barrier2FromContract(contract, lastTick);

    const prevExtremes = axis.getExtremes();
    const minData = prevExtremes.dataMin - axis.tickInterval;
    const maxData = prevExtremes.dataMax + axis.tickInterval;

    const extremes = [
        barrier1 + axis.tickInterval,
        barrier1 - axis.tickInterval,
        barrier2 + axis.tickInterval,
        barrier2 - axis.tickInterval,
        minData,
        maxData,
    ].filter(x => x || x === 0);

    const min = arrayMin(extremes);
    const max = arrayMax(extremes);

    if (lastExtremesY.min !== min || lastExtremesY.max !== max) {
        // console.log('Updating extremes on Y', [
        //     barrier1 + axis.tickInterval,
        //     barrier1 - axis.tickInterval,
        //     barrier2 + axis.tickInterval,
        //     barrier2 - axis.tickInterval,
        //     minData,
        //     maxData,
        // ], lastExtremesY, min, max);
        lastExtremesY = { min, max };
        axis.setExtremes(min, max);
    }
};

export default (chart, ticks, contract) => {
    if (!contract) return;
    const lastTick = getLastTickQuote(ticks);

    updateExtremesXAxis(chart.xAxis[0], contract);
    updateExtremesYAxis(chart.yAxis[0], contract, lastTick);
};
