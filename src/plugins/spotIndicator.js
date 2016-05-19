import { wrap, Chart } from 'highcharts/highstock';

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

const initialize = ({ renderer, pipSize, color, currentPrice, x, y, spotIndicator, priceYAxis }) => {
    spotIndicator.group = renderer.g('spot')
        .attr({ zIndex: 10 })
        .add();

    spotIndicator.poly = renderer
        .path(polyPath(x + 10, y))
        .attr({ fill: color })
        .add(spotIndicator.group);

    spotIndicator.label = renderer
        .label(currentPrice.toFixed(pipSize), x - 4 + priceYAxis.chart.marginRight, y - 9)
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

const update = ({ pipSize, currentPrice, x, y, spotIndicator, priceYAxis }) => {
    spotIndicator.label.attr({
        text: currentPrice.toFixed(pipSize),
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
        if (chart.series[0].type === 'candlestick') {          // OHLC not able to show current spot
            return;
        }
        const pipSize = chart.binary ? chart.binary.pipSize : 0;
        const priceYAxis = chart.yAxis[0];
        // let options = priceYAxis.spotIndicator || {};

        const currentPrice = lastPriceFromSeries(chart.series[0]);

        let x = priceYAxis.width;
        let y = priceYAxis.toPixels(currentPrice);

        const updateFunc = priceYAxis.spotIndicator ? update : initialize;

        if (!priceYAxis.spotIndicator) {
            priceYAxis.spotIndicator = {};
        }

        updateFunc({
            renderer: chart.renderer,
            pipSize,
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
