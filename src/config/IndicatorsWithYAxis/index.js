import { getData as rsiGetData } from './Rsi';
import { indicatorColors } from '../../styles';

const indicatorIdsWithYAxis = [];
let chartResized = false;

const removeHighchartsElement = (eId, chart) => {
    const el = chart.get(eId);
    if (el) {
        el.remove(true);
    }
};

const addIndicatorsWithYAxis = (indicatorConfsWithYAxis, chart) => {
    const chartHeight = chart.yAxis[0].height / 2; // redraw will override this
    const paddingTop = 10;
    const height = (chartHeight / indicatorConfsWithYAxis.length) - paddingTop;
    if (indicatorIdsWithYAxis.length === indicatorConfsWithYAxis.length) {
        return;
    }
    indicatorConfsWithYAxis.forEach((conf, i) => {
        const indicatorId = conf.class.toLowerCase();
        const indicatorName = conf.yAxis.name;
        const top = (chartHeight + (i * (height + paddingTop)) + paddingTop);
        if (indicatorIdsWithYAxis.includes(indicatorId)) {
            const indicatorYAxis = chart.get(`${indicatorId}-axis`);
            indicatorYAxis.update({
                top,
                height,
            }, /* redraw */ false);
        } else {
            indicatorIdsWithYAxis.push(indicatorId);
            chart.addAxis(Object.assign({
                id: `${indicatorId}-axis`,
                opposite: true,
                lineWidth: 2,
                top,
                height,
            }, conf.yAxis), /* isX */ false, /* redraw */ false);
            chart.addSeries({
                id: `${indicatorId}-series`,
                name: indicatorName,
                type: 'line',
                color: indicatorColors[indicatorId],
                yAxis: `${indicatorId}-axis`,
            }, /* redraw */ false);
        }
    });
};

const setIndicatorDataSeries = (conf, chart, chartData) => {
    const indicatorId = conf.class.toLowerCase();
    const series = chart.get(`${indicatorId}-series`);
    let indicatorData;

    if (conf.class.toLowerCase() === 'rsi') {
        indicatorData = rsiGetData(chartData, conf);
    }
    if (indicatorData) {
        series.setData(indicatorData, /* redraw */ false);
    }
};

export const renderIndicatorsWithYAxis = (chart, newData, indicatorConfs) => {
    const indicatorConfsWithYAxis = indicatorConfs.filter(conf => conf.yAxis);

    if (indicatorConfsWithYAxis.length) {
        if (!chartResized) {
            const chartHeight = chart.yAxis[0].height;
            chart.yAxis[0].update({
                height: chartHeight * 0.5,
            }, /* redraw */ false);
            chartResized = true;
        }
    } else if (chartResized) {
        const chartHeight = chart.yAxis[0].height;
        chart.yAxis[0].update({
            height: chartHeight * 2,
        }, /* redraw */ false);
        chartResized = false;
    }

    indicatorIdsWithYAxis.forEach((indicatorId, i) => {
        if (indicatorConfsWithYAxis.findIndex(indicatorConf =>
            indicatorConf.class.toLowerCase() === indicatorId) < 0) {
            removeHighchartsElement(`${indicatorId}-axis`, chart);
            removeHighchartsElement(`${indicatorId}-series`, chart);
            indicatorIdsWithYAxis.splice(i, 1);
        }
    });

    addIndicatorsWithYAxis(indicatorConfsWithYAxis, chart);

    for (const conf of indicatorConfsWithYAxis) {
        setIndicatorDataSeries(conf, chart, newData);
    }
};
