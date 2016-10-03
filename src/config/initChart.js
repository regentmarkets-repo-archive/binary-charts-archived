import { merge } from 'highcharts/highstock.src';
import { digitsToPips } from 'binary-utils';
import { lightTheme, darkTheme } from '../themes';
import createSeries from './createSeries';
import { colorBg, colorText } from '../styles';

import barrierIds from '../utils/barriersId';

const crosshairOptions = (theme, formatter) => ({
    snap: false,
    color: colorBg(theme, 1),
    dashStyle: 'LongDashDot',
    zIndex: 50,
    label: {
        enabled: true,
        padding: 5,
        shape: 'rect',
        formatter,
        style: {
            color: colorText(theme, 1),
            fontSize: '12px',
        },
    },
});

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
            crosshair: crosshairOptions(theme),
            events: {
                afterSetExtremes: function after() {
                    const { max, dataMax } = this.getExtremes();
                    if (max >= dataMax) {
                        hideEndButton(true);
                    } else {
                        hideEndButton(false);
                    }

                    const yAxis = this.chart.yAxis[0];
                    const yExt = yAxis.getExtremes();
                    const { contract } = this.chart.userOptions.binary;
                    const barrierVals =
                        barrierIds
                            .filter(x =>
                                contract &&
                                contract[x] &&
                                !contract.contract_type.includes('DIGIT'))
                            .map(k => +contract[k]);

                    if (barrierVals.length === 0) return;
                    if (barrierVals.length === 1) {
                        const barrier = barrierVals[0];
                        if (barrier > yExt.max) {
                            const barrierMaxPlus10 = barrier + ((barrier - yExt.min) * 0.05);
                            yAxis.setExtremes(yExt.min, barrierMaxPlus10, true, false);
                        } else if (barrier < yExt.min) {
                            const barrierMinPlus10 = barrier - ((yExt.max - barrier) * 0.05);
                            yAxis.setExtremes(barrierMinPlus10, yExt.max, true, false);
                        }

                        return;
                    }

                    const barrierMax = barrierVals.reduce((a, b) => Math.max(a, b));
                    const barrierMin = barrierVals.reduce((a, b) => Math.min(a, b));

                    if (yExt.max < barrierMax || yExt.min > barrierMin) {
                        const barrierMaxPlus10 = barrierMax + ((barrierMax - yExt.min) * 0.05);
                        const barrierMinPlus10 = barrierMin - ((yExt.max - barrierMin) * 0.05);

                        const newMax = Math.max(barrierMaxPlus10, yExt.max);
                        const newMin = Math.min(barrierMinPlus10, yExt.min);

                        yAxis.setExtremes(newMin, newMax, true, false);
                    }
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
    },
);
