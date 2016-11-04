import { merge } from 'highcharts/highstock.src';
import { digitsToPips } from 'binary-utils';
import createSeries from './createSeries';
import { computeMinRange } from './updateMinRange';
import themes from '../themes';
import { colorBg, colorText } from '../styles';

const crosshairOptions = (theme, formatter) => ({
    snap: false,
    color: colorBg(theme, 1),
    dashStyle: 'LongDashDot',
    zIndex: 50,
    label: {
        enabled: true,
        padding: 5,
        fontSize: 11,
        shape: 'rect',
        formatter,
        style: {
            color: colorText(theme, 1),
        },
    },
});

export default ({
    pipSize = 0,
    type = 'area',
    noData = false,
    theme = 'light',
    highContrast = false,
    shiftMode = 'fixed',
    assetName,
    hideEndButton = () => undefined,
}) =>
    merge(themes(theme, highContrast), {
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
                    symbol: 'circle',
                },
                gapSize: 4 * 60 * 60 * 1000,
            },
        },
        xAxis: {
            type: 'datetime',
            tickWidth: 0,
            startOnTick: false,
            endOnTick: false,
            crosshair: crosshairOptions(theme),
            events: {
                setExtremes: function onSetExt(ext) {
                    const futureSeries = this.chart.get('future');

                    if (futureSeries) {
                        const newMinrange = computeMinRange(this.chart, ext);
                        this.update({ minRange: newMinrange }, false);
                    }
                },
                afterSetExtremes: function after(extremes) {
                    const { max, dataMax } = extremes;
                    hideEndButton(max >= dataMax);
                },
            },
            ordinal: true,
        },
        yAxis: {
            opposite: true,
            labels: {
                align: 'left',
                formatter: function formatter() {
                    return this.value.toFixed(this.chart.userOptions.binary.pipSize);
                },
            },
            crosshair: crosshairOptions(theme, function formatter(value) {
                return value.toFixed(this.chart.userOptions.binary.pipSize);
            }),
            tickWidth: 0,
            title: { text: null },
            floor: 0,
            minTickInterval: digitsToPips(pipSize),
        },
        series: [
            createSeries(assetName, type, [], pipSize),
        ],
        exporting: {
            enabled: false,
            chartOptions: {
                chart: {
                    backgroundColor: colorText(theme, 1),
                    margin: 60,
                },
            },
        },
        responsive: {
            rules: [{
                // mobile
                condition: {
                    maxWidth: 400,
                },
                chartOptions: {
                    // yAxis: {
                    //     labels: {
                    //         align: 'right',
                    //         x: 0,
                    //     },
                    // },
                },
            }],
        },
    },
);
