import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';
import lastPriceFromSeries from '../utils/lastPriceFromSeries';
import barrierIds from '../utils/barriersId';

const extractBarrierLine = (chart, contract) => {
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) {
        return [];
    }

    const currentSpot = lastPriceFromSeries(mainSeries);

    const { dataMax } = chart.xAxis[0].getExtremes();
    const dataMin = mainSeries.xData[0];

    return barrierIds
        .filter(x =>
            contract && contract[x] &&
                contract[x] !== currentSpot &&
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
