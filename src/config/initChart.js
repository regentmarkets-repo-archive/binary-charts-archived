import { merge } from 'highcharts/highstock';
import reset from '../parts/reset';
import exporting from '../parts/exporting';
import plotOptions from '../parts/plotOptions';
import rangeSelector from '../parts/rangeSelector';
import yAxis from '../parts/yAxis';
import xAxis from '../parts/xAxis';
import seriesLine from '../parts/seriesLine';
import { lightTheme, darkTheme } from '../themes';

export default (
        {
            pipSize = 0, type = 'area', rangeChange, typeChange,
            defaultRange, showAllRangeSelector, noData, height, width, theme,
        }
    ) =>
    merge(theme === 'light' ? lightTheme : darkTheme, {
        binary: { pipSize, theme },
        ...reset({ height, width, noData }),
        plotOptions: plotOptions(),
        rangeSelector: rangeSelector(defaultRange, showAllRangeSelector),
        xAxis: xAxis({ rangeChange, type }),
        yAxis: {
            ...yAxis({ pipSize }),
            indicators: {
                enabled: true,
                pipSize,
            },
        },
        series: seriesLine({ data: [], pipSize, type }),
        tooltip: {
            style: {
                color: '#333333',
            },
        },
        exporting: exporting({ typeChange }),
    });
