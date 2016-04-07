import reset from '../parts/reset';
import plotOptions from '../parts/plotOptions';
import navigator from '../parts/navigator';
import rangeSelector from '../parts/rangeSelector';
import yAxis from '../parts/yAxis';
import xAxis from '../parts/xAxis';
import seriesLine from '../parts/seriesLine';
import spot from '../parts/spot';
import markerLastTick from '../parts/markerLastTick';
import events from '../parts/events';

import { tickToData } from '../_utils';

export default class BaseConfigurator {
    constructor() {
        this.config = reset();
    }

    plotOptions() {
        this.config.plotOptions = plotOptions();
        return this;
    }

    navigator() {
        this.config.navigator = navigator();
        return this;
    }

    rangeSelector() {
        this.config.rangeSelector = rangeSelector();
        return this;
    }

    yAxis() {
        this.config.yAxis = yAxis();
        return this;
    }

    xAxis() {
        this.config.xAxis = xAxis();
        return this;
    }

    spot(spotValue) {
        this.config.yAxis = Object.assign(this.config.yAxis, spot(spotValue));
        return this;
    }

    series(ticks) {
        const data = ticks.map(tickToData);
        this.config.series = seriesLine(data);
        return this;
    }

    markerLastSpot() {
        markerLastTick(this.config.series[0]);
        return this;
    }

    events() {
        this.config.chart.events = events();
        return this;
    }

    end() {
        return this.config;
    }
}
