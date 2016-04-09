import reset from '../parts/reset';
import plotOptions from '../parts/plotOptions';
import navigator from '../parts/navigator';
import rangeSelector from '../parts/rangeSelector';
import yAxis from '../parts/yAxis';
import xAxis from '../parts/xAxis';
import seriesLine from '../parts/seriesLine';
// import spot from '../parts/spot';
// import events from '../parts/events';
// import { tickToData } from '../_utils';

export default () => ({
    ...reset(),
    plotOptions: plotOptions(),
    navigator: navigator(),
    rangeSelector: rangeSelector(),
    xAxis: xAxis(),
    yAxis: {
        ...yAxis(),
        spotIndicator: {
            enabled: true,
        },
    },
    series: seriesLine([]),
    // events: events()
});

// this.config.chart.events = events();
