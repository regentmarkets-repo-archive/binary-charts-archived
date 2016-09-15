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

    // const { min, max } = chart.xAxis[0].getExtremes();

    // const dataMax = max || getLast(mainSeries.xData);
    // const dataMin = min || mainSeries.xData[0];

    return barrierIds
        .filter(x =>
            contract &&
            contract[x] &&
            !contract.contract_type.includes('DIGIT')
        )
        .map(x => {
            // replicate whole main series to workaround the issue where dragging result in zooming out
            // due to barrier series has too little data
            const barrierValue = +contract[x];
            const fakeData = mainSeries.options.data.map(d => [d[0], barrierValue]);
            return createHiddenSeries(fakeData, x);
            }
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
