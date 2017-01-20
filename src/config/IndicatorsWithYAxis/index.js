import Rsi from './Rsi';
import Macd from './Macd';

const indicators = {};
let chartResized = false;
let chartHeight;

const addYAxis = (chart, indicatorId, top, height) => {
    const indicator = indicators[indicatorId];

    chart.addAxis(Object.assign({
        id: `${indicatorId}-axis`,
        opposite: true,
        lineWidth: 2,
        top,
        height,
    }, indicator.getYAxis()), /* isX */ false, /* redraw */ false);

    indicator.addSeries(chart, /* redraw */ false);
};

const updateYAxisSize = (chart, indicatorId, top, height) => {
    const indicatorYAxis = chart.get(`${indicatorId}-axis`);
    indicatorYAxis.update({
        top,
        height,
    }, /* redraw */ false);
};

const addIndicators = (chart, confs) => {
    const paddingTop = 10;
    const heightRef = chartHeight / 2;
    const height = (heightRef / confs.length) - paddingTop;

    confs.forEach((conf, i) => {
        const indicatorId = conf.class.toLowerCase();
        const top = (heightRef + (i * (height + paddingTop)) + paddingTop);

        if (indicatorId in indicators) {
            updateYAxisSize(chart, indicatorId, top, height);
        } else {
            if (indicatorId === 'rsi') {
                indicators.rsi = new Rsi(chart, conf);
            }
            if (indicatorId === 'macd') {
                indicators.macd = new Macd(chart, conf);
            }
            addYAxis(chart, indicatorId, top, height);
        }
    });
};

const resizeOriginalYAxis = (chart, multiplyBy) => {
    chart.yAxis[0].update({
        height: chartHeight * multiplyBy,
    }, /* redraw */ false);
};

const setOriginalYAxisHeight = (chart, confs) => {
    if (confs.length) {
        if (!chartResized) {
            chartResized = true;
            resizeOriginalYAxis(chart, 0.5);
        }
    } else if (chartResized) {
        resizeOriginalYAxis(chart, 1);
        chartResized = false;
    }
};

const removeUnusedIndicators = (chart, confs) => {
    Object.keys(indicators).forEach(indicatorId => {
        if (confs.findIndex(indicatorConf =>
            indicatorConf.class.toLowerCase() === indicatorId) < 0) {
                indicators[indicatorId].destroy();
                delete indicators[indicatorId];
        }
    });
};

export const renderIndicatorsWithYAxis = (chart, newData, indicatorConfs) => {
    const confs = indicatorConfs.filter(conf => conf.yAxis);

    setOriginalYAxisHeight(chart, confs);

    removeUnusedIndicators(chart, confs);

    if (!chartHeight) {
        chartHeight = chart.yAxis[0].height; // redraw will override this
    }

    addIndicators(chart, confs);

    Object.keys(indicators).forEach(indicatorId =>
        indicators[indicatorId].setData(newData, /* redraw */ false)
    );
};
