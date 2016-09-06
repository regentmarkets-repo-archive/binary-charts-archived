import getMainSeries from '../utils/getMainSeries';

export default (chart: Chart, params: any) => {
    const { type } = params;
    const mainSeries = getMainSeries(chart);
    mainSeries.update({
        type,
    }, false);
};
