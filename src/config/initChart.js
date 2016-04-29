import reset from '../parts/reset';
import plotOptions from '../parts/plotOptions';
import navigator from '../parts/navigator';
import rangeSelector from '../parts/rangeSelector';
import yAxis from '../parts/yAxis';
import xAxis from '../parts/xAxis';
import seriesLine from '../parts/seriesLine';
import events from '../parts/events';

export default ({ pipSize = 0, rangeChange }) => ({
    ...reset(),
    events: events({ rangeChange }),
    plotOptions: plotOptions(),
    navigator: navigator(),
    rangeSelector: rangeSelector(),
    xAxis: xAxis(),
    yAxis: {
        ...yAxis({ pipSize }),
        spotIndicator: {
            enabled: true,
            pipSize,
        },
    },
    series: seriesLine({ data: [], pipSize }),
    // events: events()
});
