import { getLast } from 'binary-utils';
import getMainSeries from '../utils/getMainSeries';

export default (chart) => {
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) {
        return;
    }

    const xAxis = chart.xAxis[0];

    if (mainSeries.options.data.length > 1) {
        const futureSeries = chart.get('future');
        const data1 = mainSeries.options.data[0];
        const data2 = mainSeries.options.data[1];

        const xDiff = data2[0] - data1[0];
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
