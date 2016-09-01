import { plotBandForContract } from './plotBandsForContract';
import dateEntryPlotLines from '../plot-lines/dateEntryPlotLines';
import timePlotLines from '../plot-lines/timePlotLines';
import updateZones from './updateZones';
import updateExtremes from './updateExtremes';

const replacePlotObj = (axis, allPlotObjs: PlotObject[], newPlotObjs: PlotObject[], addFuncName, removeFuncName) => {
    allPlotObjs.forEach(plotObj => {
        const newObj = newPlotObjs.find(x => x.id === plotObj.id);
        if (!newObj) {
            axis[removeFuncName](plotObj.id);
        } else {
            const oldObj = axis.plotLinesAndBands.find(x => x.id === plotObj.id);

            let shouldUpdate = true;
            if (oldObj && oldObj.value) {                               // it is a line
                shouldUpdate = oldObj.options.value !== newObj.value;
            } else if (oldObj && oldObj.from) {                         // it is a band
                shouldUpdate = (oldObj.from !== newObj.from) || (oldObj.to !== newObj.to);
            }

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

export const updatePlotBands = (chart: Chart, contract: Contract) => {
    const newPlotBands = plotBandForContract(contract);
    replacePlotBands(chart.yAxis[0], newPlotBands);
};

export default (chart: Chart, contract: Contract, theme: Theme) => {
    updatePlotBands(chart, contract);

    const newPlotLines = dateEntryPlotLines(contract, theme);
    replacePlotLines(chart.xAxis[0], newPlotLines);

    updateZones(chart, newPlotLines);

    updateExtremes(chart, contract);
};
