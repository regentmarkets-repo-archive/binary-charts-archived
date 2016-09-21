// $FlowFixMe
import { wrap, Chart } from 'highcharts/highstock.src';
import { colorBg, colorText } from '../styles';
import getMainSeries from '../utils/getMainSeries';
import lastPriceFromSeries from '../utils/lastPriceFromSeries';
import barrierIds from '../utils/barriersId';

const polyPath = (x: number, y: number) => [
    'M', x - 10, y,
    'L',
    x, y - 7,
    x + 65, y - 7,
    x + 65, y + 7,
    x, y + 7,
];

const initialize = ({ renderer, pipSize, background, text, value, x, y, indicator, yAxis, zIndex }) => {
    indicator.group = renderer.g(indicator)
        .attr({ zIndex })
        .add();

    indicator.line = renderer
        .rect(0, y - 1, x + 5, 1)
        .attr({ fill: background, opacity: 0.75 })
        .add(indicator.group);

    indicator.poly = renderer
        .path(polyPath(x + 10, y))
        .attr({ fill: background })
        .add(indicator.group);

    indicator.label = renderer
        .label((+value).toFixed(pipSize), x - 4 + yAxis.chart.marginRight, y - 9)
        .attr({
            padding: 1,
        })
        .css({
            cursor: 'default',
            textAnchor: 'end',
            color: text,
        })
        .add(indicator.group);
};

const update = ({ pipSize, value, x, y, indicator, yAxis }) => {
    indicator.label.attr({
        text: (+value).toFixed(pipSize),
    });

    indicator.line.attr({ y: y - 1, width: x + 5 });

    indicator.label.attr({
        x: x - 4 + yAxis.chart.marginRight,
        y: y - 9,
    });

    indicator.poly.attr({
        d: polyPath(x + 10, y),
    });

    const extremes = yAxis.getExtremes();

    if (value > extremes.min && value < extremes.max) {
         indicator.group.show();
    } else {
         indicator.group.hide();
    }
};

const renderIndicator = ({ chart, indicator, value, x, pipSize, yAxis, background, text, zIndex }) => {
    const y = yAxis.toPixels(value) || 0;
    const updateFunc = yAxis[indicator] ? update : initialize;

    if (!yAxis[indicator]) {
        yAxis[indicator] = {};
    }

    updateFunc({
        renderer: chart.renderer,
        pipSize,
        background,
        text,
        value,
        x, y,
        indicator: yAxis[indicator],
        yAxis,
        zIndex,
    });
};

const renderAxisIndicator = (chart) => {
    const { contract, pipSize, theme } = chart.userOptions.binary;
    const yAxis = chart.yAxis[0];
    const mainSeries = getMainSeries(chart);

    if (!mainSeries || mainSeries.yData.length === 0) return;

    const currentSpot = lastPriceFromSeries(mainSeries);
    const x = yAxis.width;

    const exitSpot = contract && (contract.exit_tick || contract.sell_spot);

    if (exitSpot) {
        renderIndicator({ chart, indicator: 'spot', value: +exitSpot,
            x, pipSize, yAxis, background: '#c03', text: 'white', zIndex: 11 });
    } else {
        renderIndicator({ chart, indicator: 'spot', value: +currentSpot,
            x, pipSize, yAxis, background: '#c03', text: 'white', zIndex: 11 });
    }

    barrierIds.forEach((b) => {
        const barrierSeries = chart.get(b);
        if (barrierSeries) {
            renderIndicator({ chart, indicator: b, value: +barrierSeries.dataMin,
                x, pipSize, yAxis, background: colorBg(theme, 1), text: colorText(theme, 1), zIndex: 10 });
        } else if (yAxis[b]) {
            yAxis[b].group.hide();
        }
    });
};

export default () => {
    wrap(Chart.prototype, 'init', function init(proceed, ...args) {
        proceed.apply(this, args);
        renderAxisIndicator(this);
    });

    wrap(Chart.prototype, 'redraw', function redraw(proceed, ...args) {
        proceed.apply(this, args);
        renderAxisIndicator(this);
    });
};
