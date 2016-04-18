import getLastTick from 'binary-utils/lib/getLastTick';
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

    axis.setExtremes(min, max);
};

const getAbsoluteBarrier = (barrier, lastTickQuote) =>
    typeof barrier === 'number' ? barrier : lastTickQuote + +barrier;

const updateExtremesYAxis = (axis, ticks, contract) => {
    if (!contract.barrier && !contract.barrier2) {
        return;
    }

    const prevExtermes = axis.getExtremes();
    const lastTickQuote = getLastTick(ticks);
    const minExtremes = [getAbsoluteBarrier(contract.barrier2, lastTickQuote), prevExtermes.dataMin].filter(x => x);
    const min = arrayMin(minExtremes);
    const maxExtremes = [getAbsoluteBarrier(contract.barrier, lastTickQuote), prevExtermes.dataMax].filter(x => x);
    const max = arrayMax(maxExtremes);

    axis.setExtremes(min, max);
};

export default (chart, ticks, contract) => {
    if (!contract) return;

    updateExtremesXAxis(chart.xAxis[0], ticks, contract);
    updateExtremesYAxis(chart.yAxis[0], ticks, contract);
};
