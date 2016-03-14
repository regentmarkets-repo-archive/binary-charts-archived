const defaultOptions = {
    color: 'red',
    enabled: true,
    style: {
        color: 'white',
        fontSize: '11px',
    },
    x: 0,
    y: 0,
    zIndex: 7
};

const lastPriceFromSeries = series =>
    series.yData.length && series.yData[series.yData.length - 1];

const polyPath = (x, y, height) => [
    'M', 0, y - .5,
    'L',
    x, y,
    x + 5, y - (height / 2),
    x + 40, y - (height / 2),
    x + 40, y + (height / 2),
    x + 5, y + (height / 2),
    x, y + .5,
    0, y + .5,
];

const initialize = ({ renderer, options, currentPrice, x, y, spotIndicator }) => {

    spotIndicator.group = renderer.g('spot')
        .attr({ zIndex: options.zIndex })
        .add();

    spotIndicator.poly = renderer
        .path(polyPath(x, y, 15))
        .attr({
            fill: options.color,
        })
        .add(spotIndicator.group);

    spotIndicator.label = renderer
        .text(currentPrice, x + 40, y)
        .attr({
            zIndex: 2,
            width: 40,
            dy: 3
        })
        .css({
            cursor: 'default',
            textAnchor: 'end',
            color: options.style.color,
            fontSize: options.style.fontSize,
        })
        .add(spotIndicator.group);
}

const update = ({ currentPrice, x, y, spotIndicator, priceYAxis }) => {

    spotIndicator.label.attr({
        text: currentPrice,
        x: x + 40,
        y
    });

    spotIndicator.poly.attr({
        d: polyPath(x, y, 15)
    });

    const extremes = priceYAxis.getExtremes();

    if (currentPrice > extremes.min && currentPrice < extremes.max) {
        priceYAxis.spotIndicator.group.show();
    } else {
        priceYAxis.spotIndicator.group.hide();
    }
}

export default H => {
    const { merge, wrap, Chart } = H;

    wrap(Chart.prototype, 'init', function(proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        renderSpotIndicator(this);
    });

    wrap(Chart.prototype, 'redraw', function(proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        renderSpotIndicator(this);
    });

    function renderSpotIndicator(chart) {

        let options = chart.options.yAxis[0].spotIndicator;
        if (!options.enabled) return;
        options = merge(true, defaultOptions, options);

        const priceYAxis = chart.yAxis[0];
        const priceSeries = chart.series[0];
        const currentPrice = lastPriceFromSeries(chart.series[0]);

        const marginRight = chart.optionsMarginRight || 0;
        const marginLeft = chart.optionsMarginLeft || 0;


        const width = marginRight ? marginRight : 40;

        let x = priceYAxis.opposite ? chart.chartWidth - width : marginLeft;
        let y = priceYAxis.toPixels(currentPrice);

        // offset
        x += options.x;
        y += options.y;

        if (priceYAxis.spotIndicator) {
            update({ currentPrice, x, y, spotIndicator: priceYAxis.spotIndicator, priceYAxis });
        } else {
            priceYAxis.spotIndicator = {};
            initialize({ renderer: chart.renderer, options, currentPrice, x, y, spotIndicator: priceYAxis.spotIndicator });
        }
    };
}
