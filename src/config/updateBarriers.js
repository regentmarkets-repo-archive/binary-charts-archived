import { getLast } from 'binary-utils';
import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';
import barrierIds from '../utils/barriersId';

const extractBarrierLine = (chart, contract) => {
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) {
        return [];
    }

    // when redraw have not happen for the first time, getExtremes return null for all value
    // to make sure it always works, we compute dataMax and min ourselves

    const dataMax = getLast(mainSeries.xData);
    const dataMin = mainSeries.xData[0];

    return barrierIds
        .filter(x =>
            contract &&
            contract[x] &&
            !contract.contract_type.includes('DIGIT')
        )
        .map(x =>
            createHiddenSeries([[dataMin, +contract[x]], [dataMax, +contract[x]]], x)
        );
};

const removePreviousBarrierSeries = (chart) => {
    barrierIds.forEach(x => {
        const series = chart.get(x);
        if (series) {
            series.remove(false);
        }
    });
};

const addNewBarrierSeries = (chart, contract) => {
    const newLines = extractBarrierLine(chart, contract);
    newLines.filter(x => x).forEach(x => chart.addSeries(x, false));
};

export default (chart, contract) => {
    removePreviousBarrierSeries(chart);
    addNewBarrierSeries(chart, contract);
};
