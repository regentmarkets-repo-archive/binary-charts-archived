export default (chart, newPlotLines) => {
    const entryLine = newPlotLines.find(x => x.id === 'entry_tick_time');
    const exitLine = newPlotLines.find(x => x.id === 'exit_tick_time');
    let zones = !entryLine ? [] : [{
        value: entryLine.value,
        dashStyle: 'dash',
        color: 'grey',
        fillColor: 'none',
    }];

    if (exitLine) {
        zones = zones.concat([{
            value: exitLine.value,
            dashStyle: 'solid',
        }, {
            dashStyle: 'dash',
            color: 'grey',
            fillColor: 'none',
        }]);
    }

    chart.series[0].update({ zones }, false);
};
