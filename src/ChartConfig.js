import navigator from './parts/navigator';
import rangeSelector from './parts/rangeSelector';
import yAxis from './parts/yAxis';
import yAxisPlotLines from './parts/yAxisPlotLines';
import yAxisPlotBand from './parts/yAxisPlotBand';
import xAxis from './parts/xAxis';
import seriesLine from './parts/seriesLine';
import spot from './parts/spot';
import markerLastTick from './parts/markerLastTick';

import { tickToData } from './utils/DataUtils';

export default class ChartConfig {
    constructor() {
        this.exporting = { enabled: false };
        this.scrollbar = { enabled: false };
        this.credits = { enabled: false };
        // this.rangeSelector = { enabled: false };
        this.chart = {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
        };
    }

    navigator() {
        this.navigator = navigator();
        return this;
    }

    rangeSelector() {
        this.rangeSelector = rangeSelector();
        return this;
    }

    yAxis() {
        this.yAxis = yAxis();
        return this;
    }

    yAxisPlotLines() {
        this.yAxis = Object.assign(this.yAxis, yAxisPlotLines());
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

    spot(spotValue) {
        this.yAxis[0] = Object.assign(this.yAxis[0], spot(spotValue));
        console.log(this);
        return this;
    }

    series(ticks) {
        const data = ticks.map(tickToData);
        this.series = seriesLine(data);
        return this;
    }

    markerLastSpot() {
        markerLastTick(this.series[0]);
        return this;
    }
}
