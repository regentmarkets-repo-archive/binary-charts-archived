export default (chart, newPlotLines) => {
    const zones = newPlotLines.length < 2 ? [] : [{
        value: newPlotLines[0].value,
        dashStyle: 'dash',
        fillColor: 'none',
    }, {
        value: newPlotLines[newPlotLines.length - 1].value,
        dashStyle: 'solid',
    }, {
        dashStyle: 'dash',
        fillColor: 'none',
    }];

    chart.series[0].update({ zones });
};
