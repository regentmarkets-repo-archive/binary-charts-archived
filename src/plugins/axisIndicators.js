// $FlowFixMe
import { wrap, Chart } from '../highcharts/highstock';
import { colorBg, colorText } from '../themes';

const lastPriceFromCandles = series =>
    series.yData.length && series.yData[series.yData.length - 1][3];

const lastPriceFromTicks = series => {
    const nonNullSeries = series.yData.length && series.yData.filter(d => !!d || d === 0);
    return nonNullSeries && nonNullSeries[nonNullSeries.length - 1];
};

const lastPriceFromSeries = series =>
    (series.type === 'candlestick') ?
        lastPriceFromCandles(series) :
        lastPriceFromTicks(series);

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

const renderAxisIndicator = chart => {
    const { contract, pipSize, theme } = chart.userOptions.binary;
    const yAxis = chart.yAxis[0];
    const currentSpot = lastPriceFromSeries(chart.series[0]);
    const x = yAxis.width;

    if (chart.series[0].yData.length === 0) return;

    const exitSpot = contract && (contract.exit_tick || contract.sell_spot);
    if (exitSpot) {
        renderIndicator({ chart, indicator: 'spot', value: +exitSpot,
            x, pipSize, yAxis, background: '#c03', text: 'white', zIndex: 11 });
        return;
    }

    ['barrier', 'barrier2', 'low_barrier', 'high_barrier']
        .forEach(b => {
            if (contract && contract[b] && contract[b] !== currentSpot &&
                !contract.contract_type.includes('DIGIT')) {            // ignore digit trade
                renderIndicator({
                    chart,
                    indicator: b,
                    value: contract[b],
                    x,
                    pipSize,
                    yAxis,
                    background: colorBg(theme, 1),
                    text: colorText(theme, 1),
                    zIndex: 10,
                });
            } else if (yAxis[b] && yAxis[b].group) {
                yAxis[b].group.hide();
            }
        });

    renderIndicator({ chart, indicator: 'spot', value: currentSpot,
        x, pipSize, yAxis, background: '#c03', text: 'white', zIndex: 11 });
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
