import { wrap, Chart } from 'highcharts/highstock';
import brandColor from 'binary-utils/lib/brandColor';

// const defaultOptions = {
//     enabled: true,
// };

const lastPriceFromSeries = series =>
    series.yData.length && series.yData[series.yData.length - 1] || 0;

const polyPath = (x, y) => [
    'M', x - 10, y,
    'L',
    x, y - 7,
    x + 65, y - 7,
    x + 65, y + 7,
    x, y + 7,
];

const initialize = ({ renderer, pipSize, color, value, x, y, indicator, yAxis }) => {
    indicator.group = renderer.g(indicator)
        .attr({ zIndex: 10 })
        .add();

    indicator.line = renderer
        .rect(0, y + 1, x + 1, 2)
        .attr({ fill: color, opacity: 0.5 })
        .add(indicator.group);

    indicator.poly = renderer
        .path(polyPath(x + 10, y))
        .attr({ fill: color })
        .add(indicator.group);

    console.log('what is val? ', value);

    indicator.label = renderer
        .label(value.toFixed(pipSize), x - 4 + yAxis.chart.marginRight, y - 9)
        .attr({
            padding: 1,
        })
        .css({
            cursor: 'default',
            textAnchor: 'end',
            color: 'white',
        })
        .add(indicator.group);
};

const update = ({ pipSize, value, x, y, indicator, yAxis }) => {
    indicator.label.attr({
        text: value.toFixed(pipSize),
    });

    indicator.line.animate({ y: y - 1, width: x + 1 });

    indicator.label.animate({
        x: x - 4 + yAxis.chart.marginRight,
        y: y - 9,
    });

    indicator.poly.animate({
        d: polyPath(x + 10, y),
    });

    const extremes = yAxis.getExtremes();

    if (value > extremes.min && value < extremes.max) {
         indicator.group.show();
    } else {
         indicator.group.hide();
    }
};

const renderIndicator = ({ chart, indicator, value, x, pipSize, yAxis, color }) => {
    const y = yAxis.toPixels(value) || 0;
    const updateFunc = yAxis[indicator] ? update : initialize;

    if (!yAxis[indicator]) {
        yAxis[indicator] = {};
    }

    updateFunc({
        renderer: chart.renderer,
        pipSize,
        color,
        value,
        x, y,
        indicator: yAxis[indicator],
        yAxis,
    });
};

const renderAxisIndicator = chart => {
    // if (chart.series[0].type === 'candlestick') {          // OHLC not able to show current spot
    //     return;
    // }
    const pipSize = chart.binary ? chart.binary.pipSize : 0;
    const yAxis = chart.yAxis[0];
    const currentPrice = lastPriceFromSeries(chart.series[0]);
    const x = yAxis.width;

    renderIndicator({ chart, indicator: 'spot', value: currentPrice,
        x, pipSize, yAxis, color: '#f50c35' });

    const { contract } = chart.binary;

    ['barrier', 'barrier2', 'low_barrier', 'high_barrier']
        .forEach(b => {
            if (contract && contract[b] && contract[b] !== currentPrice) {
                renderIndicator(
                    {
                        chart,
                        indicator: b,
                        value: contract[b],
                        x,
                        pipSize,
                        yAxis,
                        color: brandColor(1),
                    }
                );
            } else {
                if (yAxis[b] && yAxis[b].group) yAxis[b].group.hide();
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
