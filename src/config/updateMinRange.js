import { getLast } from 'binary-utils';
import getMainSeries from '../utils/getMainSeries';

export default (chart) => {
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) {
        return;
    }

    const xAxis = chart.xAxis[0];
    const dataLength = mainSeries.options.data.length;
    if (dataLength > 1) {
        const futureSeries = chart.get('future');

        // use 2nd and 3rd from last to ensure getting correct interval
        // last data mutate when it's a stream
        const last3Data = mainSeries.options.data[dataLength - 3];
        const last2Data = mainSeries.options.data[dataLength - 2];

        const xDiff = last2Data[0] - last3Data[0];
        const oldMinRange = chart.xAxis[0].options.minRange;

        let newMinRange = xDiff * 10;

        if (futureSeries) {
            const futureX = getLast(futureSeries.options.data)[0];

            const { max } = xAxis.getExtremes();

            // max is null if chart is not drawn yet
            if (max && futureX <= max) {
                const lastMainData = getLast(mainSeries.options.data);
                const additionSpace = futureX - lastMainData[0];
                newMinRange = (xDiff * 10) + additionSpace;
            }
        }

        if (oldMinRange !== newMinRange) {
            xAxis.update({ minRange: newMinRange }, false);
        }
    }
};
