import plotBandsForContractAndTrade from './plotBandsForContractAndTrade';
import dateEntryPlotLines from '../plot-lines/dateEntryPlotLines';
import getLastTick from 'binary-utils/lib/getLastTick';

const replacePlotBands = (axis, newPlotBands) => {
    axis.removePlotBand('barrier-band');
    newPlotBands.forEach(band => axis.addPlotBand(band));
};

const replacePlotLines = (axis, newPlotLines) => {
    axis.removePlotLine('time-line');
    newPlotLines.forEach(line => {
        axis.addPlotLine(line);
    });
};

export default ({ chart, contract, trade, ticks }) => {
    const lastTick = getLastTick(ticks);
    const newPlotBands = plotBandsForContractAndTrade(contract || trade, lastTick);
    replacePlotBands(chart.yAxis[0], newPlotBands);

    const newPlotLines = dateEntryPlotLines(contract);
    replacePlotLines(chart.xAxis[0], newPlotLines);

    // updateExtremes(chart.xAxis[0], ticks, contract || trade)
};
