import Highcharts from 'highcharts/highstock.src';

const formatDate = date =>
    Highcharts.dateFormat('%a %d %b %H:%M:%S', date);

const htmlForTime = (point) =>
  `<div class="date-row">${formatDate(point.x)}</div>
  <div class="date-row">${formatDate(point.x + point.series.closestPointRange)}</div>`;

const htmlForTicks = (point, pipSize) => `
    <div class="binary-chart-info-bar">
        ${htmlForTime(point)}
        <div class="value-row"><span>${point.series.name}</span><span>${point.y.toFixed(pipSize)}</span></div>
    </div>
`;

const htmlForCandles = (point, pipSize) => `
    <div class="binary-chart-info-bar">
        ${htmlForTime(point)}
        <div class="value-row">${point.series.name}</div>
        <div class="ohlc-row"><span>Open</span><span>${point.open.toFixed(pipSize)}</span></div>
        <div class="ohlc-row"><span>High</span><span>${point.high.toFixed(pipSize)}</span></div>
        <div class="ohlc-row"><span>Low</span><span>${point.low.toFixed(pipSize)}</span></div>
        <div class="ohlc-row"><span>Close</span><span>${point.close.toFixed(pipSize)}</span></div>
    </div>
`;

export default (
    pipSize: number,
) => ({
    mouseOut: function mouseLeave() {
        document.getElementById('binary-chart-info-container').innerHTML = '';
    },
    mouseOver: function mouseOver() {
        const htmlFunc = this.series.type === 'line' || this.series.type === 'area' ? htmlForTicks : htmlForCandles;
        document.getElementById('binary-chart-info-container').innerHTML = htmlFunc(this, pipSize);
    },
});
