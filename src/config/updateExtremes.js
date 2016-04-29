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

    const min = arrayMin(timeEntries) - 1000;
    const max = arrayMax(timeEntries) + 1000;

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
    const maxBarrier = barrierFromContract(contract, lastTick) + 10;
    const minBarrier = barrier2FromContract(contract, lastTick) + 10;

    const prevExtremes = axis.getExtremes();
    const minExtremes = [0, minBarrier, prevExtremes.dataMin].filter(x => x);
    const min = arrayMin(minExtremes);
    const maxExtremes = [maxBarrier, prevExtremes.dataMax].filter(x => x);
    const max = arrayMax(maxExtremes);

    // console.log('min', 0, minBarrier, prevExtremes.dataMin);
    // console.log('max', 0, maxBarrier, prevExtremes.dataMax);
    // console.log(prevExtremes, min, max);
    if (prevExtremes.min !== min || prevExtremes.max !== max) {
        axis.setExtremes(min > 0 ? min : 0, max);
    }
};

export default (chart, ticks, contract) => {
    if (!contract) return;

    updateExtremesXAxis(chart.xAxis[0], ticks, contract);
    updateExtremesYAxis(chart.yAxis[0], ticks, contract);
};
