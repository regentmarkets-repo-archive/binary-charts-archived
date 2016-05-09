import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import plotBandsForContractAndTrade from './plotBandsForContractAndTrade';
import dateEntryPlotLines from '../plot-lines/dateEntryPlotLines';
import timePlotLines from '../plot-lines/timePlotLines';
import updateZones from './updateZones';
import updateExtremes from './updateExtremes';

const replacePlotObj = (axis, allPlotObjs, newPlotObjs, addFuncName, removeFuncName) => {
    allPlotObjs.forEach(plotObj => {
        const newObj = newPlotObjs.find(x => x.id === plotObj.id);
        if (!newObj) {
            axis[removeFuncName](plotObj.id);
        } else {
            const oldObj = axis.plotLinesAndBands.find(x => x.id === plotObj.id);
            const shouldUpdate = !oldObj || oldObj.options.value !== plotObj.value;

            if (shouldUpdate) {
                axis[removeFuncName](plotObj.id);
                axis[addFuncName](newObj);
            }
        }
    });
};

const replacePlotBands = (axis, newPlotBands) => {
    const allPlotBands = [{ id: 'win1' }, { id: 'loss1' }, { id: 'win2' }, { id: 'loss2' }];
    replacePlotObj(axis, allPlotBands, newPlotBands, 'addPlotBand', 'removePlotBand');
};

const replacePlotLines = (axis, newPlotLines) => {
    replacePlotObj(axis, timePlotLines, newPlotLines, 'addPlotLine', 'removePlotLine');
};

export default ({ chart, contract, ticks, contractDidNotChange }) => {
    const lastTick = getLastTickQuote(ticks);
    const newPlotBands = plotBandsForContractAndTrade(contract, lastTick);
    replacePlotBands(chart.yAxis[0], newPlotBands);

    if (contractDidNotChange) return;

    const newPlotLines = dateEntryPlotLines(contract);
    replacePlotLines(chart.xAxis[0], newPlotLines);

    updateZones(chart, newPlotLines);

    updateExtremes(chart, ticks, contract);
};
