import { merge } from 'highcharts/highstock';
import reset from '../parts/reset';
import exporting from '../parts/exporting';
import plotOptions from '../parts/plotOptions';
import navigator from '../parts/navigator';
import rangeSelector from '../parts/rangeSelector';
import yAxis from '../parts/yAxis';
import xAxis from '../parts/xAxis';
import seriesLine from '../parts/seriesLine';
// import events from '../parts/events';
import { lightTheme, darkTheme } from '../themes';

const theme = false ? lightTheme : darkTheme;

export default ({ pipSize = 0, type = 'area', rangeChange, typeChange, defaultRange, noData, height, width }) => merge(theme, {
    ...reset({ height, width, pipSize, noData }),
    plotOptions: plotOptions(),
    navigator: navigator(),
    rangeSelector: rangeSelector(defaultRange),
    xAxis: xAxis({ rangeChange, type }),
    yAxis: {
        ...yAxis({ pipSize }),
        indicators: {
            enabled: true,
            pipSize,
        },
    },
    series: seriesLine({ data: [], pipSize, type }),
    exporting: exporting({ typeChange }),
    // events: events()
});
