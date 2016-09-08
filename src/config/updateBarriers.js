import seriesLine from '../parts/seriesLine';
import getMainSeries from '../utils/getMainSeries';
import lastPriceFromSeries from '../utils/lastPriceFromSeries';
import barrierIds from '../utils/barriersId';

const extractBarrierLine = (chart, contract) => {
    const { pipSize } = chart.userOptions.binary;
    const mainSeries = getMainSeries(chart);
    const currentSpot = lastPriceFromSeries(mainSeries);

    const { dataMax } = chart.xAxis[0].getExtremes();

    return barrierIds.map(b => {
        const hasBarrier = contract && contract[b] &&
            contract[b] !== currentSpot &&
            !contract.contract_type.includes('DIGIT');

        if (!hasBarrier) {
            return undefined;
        }

        const yVal = +contract[b];
        const data = [[dataMax, yVal]];

        return seriesLine(data, pipSize, 'line', b);
    });
};

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
    });
};
