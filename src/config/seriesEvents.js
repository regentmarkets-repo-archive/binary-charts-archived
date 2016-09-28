const htmlForTicks = (point, pipSize) => `
    <div class="binary-chart-info-bar">
        <div class="date-row">${new Date(point.x)}</div>
        <div class="value-row"><span>${point.series.name}</span><span>${point.y.toFixed(pipSize)}</span></div>
    </div>
`;

const htmlForCandles = (point, pipSize) => `
    <div class="binary-chart-info-bar">
        <div class="date-row">${new Date(point.x)}</div>
        <div class="value-row">${point.series.name}</div>
        <div><span>Open</span><span>${point.open.toFixed(pipSize)}</span></div>
        <div><span>High</span><span>${point.high.toFixed(pipSize)}</span></div>
        <div><span>Low</span><span>${point.low.toFixed(pipSize)}</span></div>
        <div><span>Close</span><span>${point.close.toFixed(pipSize)}</span></div>
    </div>
`;

export default (
    pipSize: number,
) => ({
    mouseOut: function mouseLeave() {
        document.getElementById('binary-chart-info-container').innerHTML = '';
    },
    mouseOver: function mouseOver() {
        console.log(this);
        const htmlFunc = this.series.type === 'line' || this.series.type === 'area' ? htmlForTicks : htmlForCandles;
        document.getElementById('binary-chart-info-container').innerHTML = htmlFunc(this, pipSize);
    },
});
