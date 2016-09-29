import { getLast } from 'binary-utils';
import getMainSeries from '../utils/getMainSeries';

export const computeMinRange = (chart, ignoreFuture = false) => {
    const mainSeries = getMainSeries(chart);
    const futureSeries = chart.get('future');
    const { max } = chart.xAxis[0].getExtremes();

    const lastMainSeriesData = getLast(mainSeries.options.data);

    const dataLength = mainSeries.options.data.length;
    const last3Data = mainSeries.options.data[dataLength - 3];
    const last2Data = mainSeries.options.data[dataLength - 2];
    const xDiff = last2Data[0] - last3Data[0];

    if (ignoreFuture) return xDiff * 10;

    if (max && max > lastMainSeriesData[0]) {
        const futureX = getLast(futureSeries.options.data)[0];
        const additionSpace = futureX - lastMainSeriesData[0];
        return (xDiff * 10) + additionSpace;
    }
    
    return xDiff * 10;
};

export default (chart) => {
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) {
        return;
    }

    const dataLength = mainSeries.options.data.length;
    if (dataLength > 1) {
        const oldMinRange = chart.xAxis[0].options.minRange;
        const newMinRange = computeMinRange(chart);

        if (oldMinRange !== newMinRange) {
            chart.xAxis[0].update({ minRange: newMinRange }, true);
        }
    }
};
