import reset from './parts/reset';
import yAxis from './parts/yAxis';
import yAxisPlotLines from './parts/yAxisPlotLines';
import yAxisPlotBand from './parts/yAxisPlotBand';
import xAxis from './parts/xAxis';
import series from './parts/series';

export default class ChartConfig {
    constructor() {
        this.exporting = { enabled: false };
        this.scrollbar = { enabled: false };
        this.rangeSelector = { enabled: false };
        this.credits = { enabled: false };
        this.chart = {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 150,
        };
    }

    yAxis() {
        this.yAxis = yAxis();
        return this;
    }

    yAxisPlotLines() {
        this.yAxis = Object.assign(this.yAxis, yAxisPlotLines())
        return this;
    }

    yAxisPlotBand() {
        this.yAxisPlotBand = yAxisPlotBand();
        return this;
    }

    xAxis() {
        this.xAxis = xAxis();
        return this;
    }

    series(ticks) {
        const data = ticks.map(x => [new Date(x.epoch * 1000), x.quote]);
        this.series = series(data);
        return this;
    }
}
