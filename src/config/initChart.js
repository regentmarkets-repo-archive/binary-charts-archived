// $FlowFixMe
import { merge } from '../highcharts/highstock';
import reset from '../parts/reset';
import yAxis from '../parts/yAxis';
import xAxis from '../parts/xAxis';
import seriesLine from '../parts/seriesLine';
import { lightTheme, darkTheme } from '../themes';

// $FlowFixMe
export default ({ pipSize = 0,
                type = 'area',
                onRangeChange = () => ({}),
                onTypeChange,
                showAllRangeSelector = true,
                noData = false,
                height,
                width,
                theme = 'light',
                shiftMode = 'fixed' }) =>
    merge(theme === 'light' ? lightTheme : darkTheme, {
        binary: { pipSize, theme, lastYExtremes: {}, shiftMode, type },
        ...reset(height, width, noData),
        rangeSelector: {
            enabled: false,
        },
        xAxis: xAxis(onRangeChange),
        yAxis: {
            ...yAxis(pipSize),
        },
        series: seriesLine([], pipSize, type),
    });
