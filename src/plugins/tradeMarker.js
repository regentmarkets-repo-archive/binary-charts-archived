// $FlowFixMe
import { wrap, Chart } from 'highcharts/highstock';
import getMainSeries from '../utils/getMainSeries';

export default () => {
    function renderTradeMarker(chart) {
        if (chart.tradeMarker) {
            (chart.tradeMarker.element).remove();
        }

        const series = getMainSeries(chart);
        const len = series.data.length - 1;
        const lastPoint = series.data[len];

        if (!lastPoint) return;

        const pixelX = chart.xAxis[0].toPixels(lastPoint.x);
        const pixelY = chart.yAxis[0].toPixels(lastPoint.y);

        chart.tradeMarker = chart.renderer
            .circle(pixelX, pixelY, 3).attr({
                fill: lastPoint.color,
                zIndex: 115,
            })
            .css({
                color: lastPoint.color,
            })
            .add();
    }

    wrap(Chart.prototype, 'redraw', function redraw(proceed, ...args) {
        proceed.apply(this, args);
        renderTradeMarker(this);
    });
};
