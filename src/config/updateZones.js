import getMainSeries from '../utils/getMainSeries';

const insideStyle = {
    color: 'lightgrey',
    fillColor: 'none',
    lineWidth: 5,
};

const outsideStyle = {
    dashStyle: 'solid',
};

export default (chart: Chart, newPlotLines: PlotObject[]) => {
    const entryLine = newPlotLines.find(x => x.id === 'entry_tick_time');
    const exitLine = newPlotLines.find(x => x.id === 'exit_tick_time');
    const zones = [];

    if (entryLine) {
        zones.push({
            value: entryLine.value,
            ...insideStyle,
        });
    }

    if (exitLine) {
        zones.push({
            value: exitLine.value,
            ...outsideStyle,
        });
        zones.push(insideStyle);
    }

    const mainSeries = getMainSeries(chart);
    if (mainSeries) {
        mainSeries.update({ zones }, false);
    }
};
