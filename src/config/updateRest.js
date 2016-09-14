import { digitsToPips } from 'binary-utils';
import getMainSeries from '../utils/getMainSeries';

export default (chart: Chart, params: any) => {
    const { pipSize } = params;
    const mainSeries = getMainSeries(chart);

    if (!mainSeries) return;

    mainSeries.update({
        tooltip: {
            valueDecimals: pipSize,
        },
    }, false);

    chart.yAxis[0].update({
        minTickInterval: digitsToPips(pipSize),
    }, false);
};
