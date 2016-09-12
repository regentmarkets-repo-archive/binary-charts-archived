import { merge } from 'highcharts/highstock';
import { digitsToPips } from 'binary-utils';
import { lightTheme, darkTheme } from '../themes';
import seriesLine from './seriesLine';

export default ({ pipSize = 0, type = 'area', noData = false, theme = 'light', shiftMode = 'fixed' }) =>
    merge(theme === 'light' ? lightTheme : darkTheme, {
        binary: { pipSize, theme, lastYExtremes: {}, shiftMode, type },
        animation: false,
        scrollbar: { enabled: false },
        credits: { enabled: false },
        legend: { enabled: false },
        rangeSelector: { enabled: false },
        exporting: { enabled: false },
        title: { text: null },
        navigator: { enabled: false },

        noData: {
            style: noData ? {} : { display: 'none' },
        },
        chart: {
            spacingBottom: 10,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            events: {
                load: function onLoad() { // eslint-disable-line object-shorthand
                    this.xAxis[0].chart = this;
                },
            },
        },
        plotOptions: {
            series: {
                connectNulls: false,
                marker: {
                    enabled: false,
                },
            },
        },
        xAxis: {
            type: 'datetime',
            tickWidth: 0,
            startOnTick: false,
            endOnTick: false,
            crosshair: false,
            ordinal: false,
        },
        yAxis: {
            opposite: true,
            labels: {
                align: 'left',
                formatter() {
                    const updatedPipSize = this.chart.userOptions.binary.pipSize;
                    return this.value.toFixed(updatedPipSize);
                },
            },
            crosshair: false,
            tickWidth: 0,
            title: { text: null },
            floor: 0,
            minTickInterval: digitsToPips(pipSize),
        },
        series: seriesLine([], pipSize, type),
    }
);
