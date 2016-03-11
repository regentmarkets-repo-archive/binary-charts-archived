const defaultOptions = {
    color: 'red',
    enabled: true,
    style: {
        color: '#ffffff',
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

const render = ({ renderer, options, currentPrice, x, y, spotIndicator }) => {

    spotIndicator.group = renderer.g('spot')
        .attr({ zIndex: options.zIndex })
        .add();

    spotIndicator.label = renderer.text(currentPrice, x + 35, y)
        .attr({ zIndex: 2, dy: 3 })
        .css({
            cursor: 'default',
            textAnchor: 'end',
            color: options.style.color,
            fontSize: options.style.fontSize,
        })
        .add(spotIndicator.group);

    spotIndicator.poly = renderer
        .path(polyPath(x, y, 15))
        .attr({
            fill: options.color,
        })
        .add(spotIndicator.group);
}

const animate = ({ currentPrice, x, y, spotIndicator }) => {

    spotIndicator.label.animate({
        text: currentPrice,
        y: y
    }, 0);

    spotIndicator.poly.animate({
        d: polyPath(x, y, 15)
    }, 0);
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

        var priceYAxis = chart.yAxis[0],
            priceSeries = chart.series[0],

            extremes = priceYAxis.getExtremes(),
            min = extremes.min,
            max = extremes.max,

            options = chart.options.yAxis[0].spotIndicator,

            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            marginRight = chart.optionsMarginRight || 0,
            marginLeft = chart.optionsMarginLeft || 0;

        options = merge(true, defaultOptions, options);

        const currentPrice = lastPriceFromSeries(chart.series[0]);
        const width = marginRight ? marginRight : 40;

        let x = priceYAxis.opposite ? chartWidth - width : marginLeft;
        let y = priceYAxis.toPixels(currentPrice);

        // offset
        x += options.x;
        y += options.y;

        if (!options.enabled) return;

        if (priceYAxis.spotIndicator) {
            animate({ renderer: chart.renderer, options, currentPrice, x, y, spotIndicator: priceYAxis.spotIndicator });
        } else {
            priceYAxis.spotIndicator = {};
            render({ renderer: chart.renderer, options, currentPrice, x, y, spotIndicator: priceYAxis.spotIndicator });
        }

        if (currentPrice > min && currentPrice < max) {
            priceYAxis.spotIndicator.group.show();
        } else {
            priceYAxis.spotIndicator.group.hide();
        }
    };
}
