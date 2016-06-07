import { plotBandForContract } from './plotBandsForContract';
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

const showDataLabelsForDigit = (chart, contract, pipSize) => {
    if (contract && contract.contract_type.includes('DIGIT')) {
        const opt = chart.series[0].options;
        opt.dataLabels = { enabled: true, format: `{point.y:,.${pipSize}f}` };
        chart.series[0].update(opt);
    } else {
        const opt = chart.series[0].options;
        opt.dataLabels = { enabled: false };
        chart.series[0].update(opt);
    }
};

export const updatePlotBands = ({ chart, contract }) => {
    const newPlotBands = plotBandForContract(contract);
    replacePlotBands(chart.yAxis[0], newPlotBands);
};

export default ({ chart, contract, ticks, pipSize }) => {
    showDataLabelsForDigit(chart, contract, pipSize);

    updatePlotBands({ chart, contract });

    const newPlotLines = dateEntryPlotLines(contract);
    replacePlotLines(chart.xAxis[0], newPlotLines);

    updateZones(chart, newPlotLines);

    updateExtremes(chart, ticks, contract);
};
