export default H => {
    const { wrap, Chart } = H;
    
     wrap(Chart.prototype, 'redraw', function(proceed) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        renderSpotIndicator(this);
    });

    function renderSpotIndicator(chart){
        if (chart.tradeMarker){
            (chart.tradeMarker.element).remove();
        }
        
        const series = chart.series[0],
              len = series.data.length - 1,
              lastPoint = series.data[len];        

        if(lastPoint){
            const pixelX = chart.xAxis[0].toPixels(lastPoint.x),
                  pixelY = chart.yAxis[0].toPixels(lastPoint.y);
            chart.tradeMarker = chart.renderer
                .circle(pixelX, pixelY, 4).attr({
                    fill: lastPoint.color,
                    zIndex: 115
                })
                .css({
                    color: lastPoint.color
                })
                .add();
        }

    }

} ;