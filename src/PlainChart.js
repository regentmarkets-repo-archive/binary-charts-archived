import Highcharts from 'highcharts/highstock.src';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

const createChart = (renderTo, params) => {
    const config = initChart(params);
    const chart = new Highcharts.StockChart(renderTo, config);
    if (params.type === 'candlestick') {
        chart.xAxis[0].update({
            minRange: 10 * 60 * 1000,
        });
    }

    return chart;
};

export default (renderTo: string, params: Object): Object => {
    let chart = createChart(renderTo, params);
    updateChart(chart, { ticks: [] }, params);

    let currentParams = params;
    const imperativeUpdate = (newParams) => {
        if (currentParams.symbol !== newParams.symbol ||
            currentParams.type !== newParams.type ||
            currentParams.noData !== newParams.noData) {
            chart.destroy();
            chart = createChart(renderTo, newParams);
        }
        updateChart(chart, currentParams, newParams);
        currentParams = newParams;
    };

    const destroyChart = () => chart.destroy();

    return {
        updateChart: imperativeUpdate,
        destroy: destroyChart,
    };
};
