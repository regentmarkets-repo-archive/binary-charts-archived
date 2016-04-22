import Highcharts from 'highcharts/highstock';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

export default (renderTo, params) => {
    const config = initChart(params);
    config.chart.renderTo = renderTo;
    const chart = new Highcharts.StockChart(config);
    updateChart(chart, { ticks: [] }, params);

    let currentParams = params;
    const imperativeUpdate = newParams => {
        updateChart(chart, currentParams, newParams);
        currentParams = newParams;
    };

    return {
        chart,
        updateChart: imperativeUpdate
    };
};
