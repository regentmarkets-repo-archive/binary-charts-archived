import getSeriesByType from './getSeriesByType';

export default (chart) => {
    const chartType = chart.userOptions.binary.type;
    return getSeriesByType(chart, chartType);
};
