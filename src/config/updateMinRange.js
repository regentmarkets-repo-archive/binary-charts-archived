import { getLast } from 'binary-utils';
import getMainSeries from '../utils/getMainSeries';

export const computeMinRange = (chart, targetExtremes) => {
    const mainSeries = getMainSeries(chart);
    const futureSeries = chart.get('future');
    const { max, dataMin, dataMax } = targetExtremes;

    const lastMainSeriesData = getLast(mainSeries.options.data);

    const dataLength = mainSeries.options.data.length;

    // show all data if there's less than 3 data
    if (dataLength < 3) {
        return dataMax - dataMin;
    }

    const last3Data = mainSeries.options.data[dataLength - 3];
    const last2Data = mainSeries.options.data[dataLength - 2];
    const xDiff = last2Data[0] - last3Data[0];

    if (max && futureSeries && max > lastMainSeriesData[0]) {
        const additionSpace = max - lastMainSeriesData[0];
        return (xDiff * 10) + additionSpace;
    }

    return xDiff * 10;
};

export default (chart) => {
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) {
        return false;
    }

    const dataLength = mainSeries.options.data.length;
    if (dataLength > 1) {
        const oldMinRange = chart.xAxis[0].options.minRange;
        const newMinRange = computeMinRange(chart, chart.xAxis[0].getExtremes());

        if (oldMinRange !== newMinRange) {
            chart.xAxis[0].update({ minRange: newMinRange }, false);
            return true;
        }
    }
    return false;
};
