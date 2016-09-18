import { merge } from 'highcharts/highstock';
import { digitsToPips } from 'binary-utils';
import { lightTheme, darkTheme } from '../themes';
import createSeries from './createSeries';
import { colorText } from '../styles';

export default ({
    pipSize = 0,
    type = 'area',
    noData = false,
    theme = 'light',
    shiftMode = 'fixed',
    assetName,
    hideEndButton = () => undefined,
}) =>
    merge(theme === 'light' ? lightTheme : darkTheme, {
        binary: { pipSize, theme, lastYExtremes: {}, shiftMode, type },
        animation: false,
        scrollbar: { enabled: false },
        credits: { enabled: false },
        legend: { enabled: false },
        rangeSelector: { enabled: false },
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
                gapSize: 4 * 60 * 60 * 1000,
            },
        },
        xAxis: {
            type: 'datetime',
            tickWidth: 0,
            startOnTick: false,
            endOnTick: false,
            crosshair: false,
            events: {
                afterSetExtremes: function after() {
                    const { max, dataMax } = this.getExtremes();
                    if (max >= dataMax) {
                        hideEndButton(true);
                    } else {
                        hideEndButton(false);
                    }
                },
            },
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
        series: [
            createSeries(assetName, type, [], pipSize),
        ],
        tooltip: {
            shape: 'square',
            positioner: () => ({ x: 0, y: 0 }),
            borderWidth: 0,
            useHTML: true,
//            followPointer: true,
        },
        exporting: {
            enabled: false,
            chartOptions: {
                chart: {
                    backgroundColor: colorText(theme, 1),
                    margin: 60,
                },
            },
        },
    },
);
