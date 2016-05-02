import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier2FromContract';
import { timePlotLines } from '../plot-lines/dateEntryPlotLines';

const arrayMin = arr => Math.min.apply(Math, arr);
const arrayMax = arr => Math.max.apply(Math, arr);

const updateExtremesXAxis = (axis, ticks, contract) => {
    const timeEntries = timePlotLines
        .filter(x => contract[x.id])
        .map(x => contract[x.id] * 1000);

    if (timeEntries.length === 0) {
        return;
    }

    const min = arrayMin(timeEntries) - axis.tickInterval;
    const max = arrayMax(timeEntries) + axis.tickInterval;

    const prevExtremes = axis.getExtremes();

    // console.log(prevExtremes, min, max);
    if (prevExtremes.min !== min || prevExtremes.max !== max) {
        axis.setExtremes(min, max);
    }
};

const updateExtremesYAxis = (axis, ticks, contract) => {
    if (!contract.barrier && !contract.barrier2) {
        return;
    }

    const lastTick = getLastTickQuote(ticks);
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

    if (prevExtremes.min !== min || prevExtremes.max !== max) {
        axis.setExtremes(min, max);
    }
};

export default (chart, ticks, contract) => {
    if (!contract) return;

    updateExtremesXAxis(chart.xAxis[0], ticks, contract);
    updateExtremesYAxis(chart.yAxis[0], ticks, contract);
};
