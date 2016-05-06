import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import plotBandsForContractAndTrade from './plotBandsForContractAndTrade';
import dateEntryPlotLines from '../plot-lines/dateEntryPlotLines';
import timePlotLines from '../plot-lines/timePlotLines';
import updateZones from './updateZones';
import updateExtremes from './updateExtremes';

const replacePlotBands = (axis, newPlotBands) => {
    axis.removePlotBand('barrier-band');
    newPlotBands.forEach(band => axis.addPlotBand(band));
};

const replacePlotLines = (axis, newPlotLines) => {
    timePlotLines.forEach(plotLine => {
        const newLine = newPlotLines.find(x => x.id === plotLine.id);
        if (!newLine) {
            axis.removePlotLine(plotLine.id);
        } else {
            const oldLine = axis.plotLinesAndBands.find(x => x.id === plotLine.id);
            const shouldUpdate = !oldLine || oldLine.options.value !== newLine.value;

            if (shouldUpdate) {
                axis.removePlotLine(plotLine.id);
                axis.addPlotLine(newLine);
            }
        }
    });
};

export default ({ chart, contract, ticks }) => {
    const lastTick = getLastTickQuote(ticks);
    const newPlotBands = plotBandsForContractAndTrade(contract, lastTick);
    replacePlotBands(chart.yAxis[0], newPlotBands);

    const newPlotLines = dateEntryPlotLines(contract);
    replacePlotLines(chart.xAxis[0], newPlotLines);

    updateZones(chart, newPlotLines);

    updateExtremes(chart, ticks, contract);
};
