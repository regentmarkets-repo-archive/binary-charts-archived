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

//    const tickMin = ticks[0] && ticks[0].epoch;
//    const contractMin = contract.entry_spot;
//    const extremesMin = [tickMin, contractMin].filter(x => x);
    const min = arrayMin(timeEntries) - 1000;
    const max = arrayMax(timeEntries) + 1000;

//    const tickMax = getLastTick(ticks).epoch;
//    const contractMax = contract.expiry_time + 1;
//    const extremesMax = [tickMax, contractMax].filter(x => x);
    axis.setExtremes(min, max);
};

const updateExtremesYAxis = (axis, ticks, contract) => {
    const prevExtermes = axis.getExtremes();
    const lastTickQuote = getLastTick(ticks);
    const minExtremes = [lastTickQuote + contract.barrier2, prevExtermes.min].filter(x => x);
    const min = arrayMin(minExtremes);
    const maxExtremes = [lastTickQuote + contract.barrier, prevExtermes.max].filter(x => x);
    const max = arrayMax(maxExtremes);

    axis.setExtremes(min, max);
};

export default (chart, ticks, contract) => {
    if (!contract) return;

    updateExtremesXAxis(chart.xAxis[0], ticks, contract);
    updateExtremesYAxis(chart.yAxis[0], ticks, contract);
};
