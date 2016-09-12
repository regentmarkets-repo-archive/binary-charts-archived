import getMainSeries from '../utils/getMainSeries';

export default (chart) => {
    const mainSeries = getMainSeries(chart);

    if (mainSeries.options.data.length > 1) {
        const data1 = mainSeries.options.data[0];
        const data2 = mainSeries.options.data[1];

        const xDiff = data2[0] - data1[0];
        const oldMinRange = chart.xAxis[0].options.minRange;
        const newMinRange = xDiff * 10;

        if (oldMinRange !== newMinRange) {
            chart.xAxis[0].update({
                minRange: newMinRange,
            }, false);
        }
    }
};
