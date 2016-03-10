export default (H) => {
    'use strict';
    var merge = H.merge;

    H.wrap(H.Chart.prototype, 'init', function(proceed) {

        // Run the original proceed method
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        renderspotIndicator(this);
    });

    H.wrap(H.Chart.prototype, 'redraw', function(proceed) {

        // Run the original proceed method
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));

        renderspotIndicator(this);
    });

    function renderspotIndicator(chart) {

        var priceYAxis = chart.yAxis[0],
            priceSeries = chart.series[0],
            priceData = priceSeries.yData,
            currentPrice = priceData.length && priceData[priceData.length - 1],

            extremes = priceYAxis.getExtremes(),
            min = extremes.min,
            max = extremes.max,

            options = chart.options.yAxis[0].spotIndicator,
            defaultOptions = {
                backgroundColor: '#000000',
                borderColor: '#000000',
                lineColor: '#000000',
                lineDashStyle: 'Solid',
                lineOpacity: 0.8,
                enabled: true,
                style: {
                    color: '#ffffff',
                    fontSize: '11px',
                },
                x: 0,
                y: 0,
                zIndex: 7
            },

            chartWidth = chart.chartWidth,
            chartHeight = chart.chartHeight,
            marginRight = chart.optionsMarginRight || 0,
            marginLeft = chart.optionsMarginLeft || 0,

            renderer = chart.renderer,

            spotIndicator = priceYAxis.spotIndicator || {},
            isRendered = Object.keys(spotIndicator).length,

            group = spotIndicator.group,
            label = spotIndicator.label,
            box = spotIndicator.box,
            poly = spotIndicator.poly,
            line = spotIndicator.line;

        options = merge(true, defaultOptions, options);

        const width = marginRight ? marginRight : 40;

        let x = priceYAxis.opposite ? chartWidth - width : marginLeft;
        let y = priceYAxis.toPixels(currentPrice);

        const lineFrom = priceYAxis.opposite ? marginLeft : chartWidth - marginRight;

        // offset
        x += options.x;
        y += options.y;



        if (!options.enabled) return;

        // render or animate
        if (!isRendered) {
            // group
            group = renderer.g()
                .attr({
                    zIndex: options.zIndex
                })
                .add();

            // label
            label = renderer.text(currentPrice, x + 5, y)
                .attr({
                    zIndex: 2,
                })
                .css({
                    cursor: 'default',
                    color: options.style.color,
                    fontSize: options.style.fontSize,
                })
                .add(group);

            const height = label.getBBox().height;

            poly = renderer
                .path(['M', x, y, 'L', x + 5, y - (height / 2), x + 5, y + (height / 2)])
                .attr({
                    fill: options.backgroundColor,
                    zIndex: 100,
                })
                .add();

            // box
            box = renderer.rect(x + 5, y - (height / 2), width, height)
                .attr({
                    fill: options.backgroundColor,
                    stroke: options.borderColor,
                    zIndex: 1,
                    'stroke-width': 1
                })
                .add(group);

            // line
            line = renderer.path(['M', lineFrom, y, 'L', x, y])
                .attr({
                    stroke: options.lineColor,
                    'stroke-width': 1,
                    opacity: options.lineOpacity,
                    zIndex: 1,
                })
                .add(group);

            // adjust
            label.animate({
                y: y + (height / 4)
            }, 0);
        } else {
            spotIndicator.label.animate({
                text: currentPrice,
                y: y
            }, 0);

            const height = spotIndicator.label.getBBox().height;

            spotIndicator.box.animate({
                y: y - (height / 2)
            }, 0);

            spotIndicator.line.animate({
                d: ['M', lineFrom, y, 'L', x, y]
            }, 0);

            spotIndicator.poly.animate({
                d: ['M', lineFrom, y, 'L', x, y]
            }, 0);

            poly = renderer
                .path(['M', x, y, 'L', x + 5, y - (height / 2), x + 5, y + (height / 2)])
                .attr({
                    fill: options.backgroundColor,
                    zIndex: 1,
                })
                .add();

            // adjust
            spotIndicator.label.animate({
                y: y + (height / 4)
            }, 0);
        }

        if (currentPrice > min && currentPrice < max) {
            group.show();
        } else {
            group.hide();
        }

        // register to price y-axis object
        priceYAxis.spotIndicator = {
            group,
            label,
            box,
            poly,
            line,
        };

    };
}
