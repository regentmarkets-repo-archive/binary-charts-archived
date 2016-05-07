import { wrap, Chart } from 'highcharts/highstock';

// const defaultOptions = {
//     enabled: true,
// };

const lastPriceFromSeries = series =>
    series.yData.length && series.yData[series.yData.length - 1] || 0;

const polyPath = (x, y) => [
    'M', x - 10, y,
    'L',
    x, y - 8,
    x + 65, y - 8,
    x + 65, y + 8,
    x, y + 8,
];

const initialize = ({ renderer, options, color, currentPrice, x, y, spotIndicator, priceYAxis }) => {
    spotIndicator.group = renderer.g('spot')
        .attr({ zIndex: 10 })
        .add();

    spotIndicator.poly = renderer
        .path(polyPath(x + 10, y))
        .attr({ fill: color })
        .add(spotIndicator.group);

    spotIndicator.label = renderer
        .label(currentPrice.toFixed(options.pipSize), x - 4 + priceYAxis.chart.marginRight, y - 9)
        .attr({
            padding: 1,
        })
        .css({
            cursor: 'default',
            textAnchor: 'end',
            color: 'white',
        })
        .add(spotIndicator.group);
};

const update = ({ options, currentPrice, x, y, spotIndicator, priceYAxis }) => {
    spotIndicator.label.attr({
        text: currentPrice.toFixed(options.pipSize),
    });

    spotIndicator.label.animate({
        x: x - 4 + priceYAxis.chart.marginRight,
        y: y - 9,
    });

    spotIndicator.poly.animate({
        d: polyPath(x + 10, y),
    });

    const extremes = priceYAxis.getExtremes();

    if (currentPrice > extremes.min && currentPrice < extremes.max) {
         priceYAxis.spotIndicator.group.show();
    } else {
         priceYAxis.spotIndicator.group.hide();
    }
};

export default () => {
    const renderSpotIndicator = chart => {
        const priceYAxis = chart.yAxis[0];
        let options = priceYAxis.spotIndicator || {};

        const currentPrice = lastPriceFromSeries(chart.series[0]);

        let x = priceYAxis.width;
        let y = priceYAxis.toPixels(currentPrice);

        const updateFunc = priceYAxis.spotIndicator ? update : initialize;

        if (!priceYAxis.spotIndicator) {
            priceYAxis.spotIndicator = {};
        }

        updateFunc({
            renderer: chart.renderer,
            options,
            color: '#f50c35',
            currentPrice,
            x, y,
            spotIndicator: priceYAxis.spotIndicator,
            priceYAxis,
        });
    };

    wrap(Chart.prototype, 'init', function init(proceed, ...args) {
        proceed.apply(this, args);
        renderSpotIndicator(this);
    });

    wrap(Chart.prototype, 'redraw', function redraw(proceed, ...args) {
        proceed.apply(this, args);
        renderSpotIndicator(this);
    });
};
