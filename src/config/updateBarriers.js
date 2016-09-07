import seriesLine from '../parts/seriesLine';
import getMainSeries from '../utils/getMainSeries';
import lastPriceFromSeries from '../utils/lastPriceFromSeries';
import barrierIds from '../utils/barriersId';

const extractBarrierLine = (chart, contract) => {
    const mainSeries = getMainSeries(chart);
    const currentSpot = lastPriceFromSeries(mainSeries);

    const { dataMin, dataMax } = chart.xAxis[0].getExtremes();

    return barrierIds.map(b => {
        if (contract && contract[b] &&
            contract[b] !== currentSpot &&
            !contract.contract_type.includes('DIGIT')) {            // ignore digit trade
            const yVal = +contract[b];
            const data = [[dataMin, yVal], [dataMax, yVal]];
            const { pipSize } = chart.userOptions.binary;
            return seriesLine(data, pipSize, 'line', b);
        }
    });
}

export default (chart, contract) => {
    const newLines = extractBarrierLine(chart, contract);
    barrierIds.forEach(i => {
        const line = chart.get(i);
        if (line) {
            line.remove();
        }
    });
    newLines.forEach(l => {
        if (l) {
            const hidden = Object.assign({ lineWidth: 0 }, l[0]);
            chart.addSeries(hidden, false);
        }
    })
};
