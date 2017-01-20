import macdArray from 'binary-indicators/lib/macd';
import { indicatorColors } from '../../styles';

const yAxis = {
    title: {
        text: 'MACD (12, 26, 9)',
        rotation: 90,
        margin: -30,
    },
    plotOptions: {
        series: {
            pointPadding: 0,
            groupPadding: 0.01,
        }
    },
    name: 'MACD',
};

const seriesConf = [
    {
        id: 'macd-histogram-series',
        name: 'MACD - Histogram',
        type: 'column',
        color: indicatorColors.macd.histogram,
        yAxis: 'macd-axis',
        dataGrouping: {
            enabled: false,
        }
    },
    {
        id: 'macd-macd-series',
        name: 'MACD',
        type: 'line',
        color: indicatorColors.macd.macd,
        yAxis: 'macd-axis',
        dataGrouping: {
            enabled: false,
        }
    },
    {
        id: 'macd-signal-series',
        name: 'MACD - Signal',
        type: 'line',
        color: indicatorColors.macd.signal,
        yAxis: 'macd-axis',
        dataGrouping: {
            enabled: false,
        }
    },
];

const defaultConf = {
    periods: 14,
};

export default class Macd {
    constructor(chart, conf = {}) {
        this.chart = chart;
        this.series = [];
        this.conf = Object.assign({}, defaultConf, conf);
    }
    setData(chartData, ...args) {
        if (chartData.length < this.conf.periods) {
            return;
        }
        const isOHLC = !!chartData[0].open;
        const yData = isOHLC ? chartData.map(d => +d.close) : chartData.map(d => +d.quote);
        const data = macdArray(yData, this.conf);

        const dataLengthDiff = chartData.length - data.length;
        this.series.forEach((s, seriesIndex) =>
            s.setData(
                chartData.map((d, i) => [
                    d.epoch * 1000,
                    i > dataLengthDiff ?
                    data[i - dataLengthDiff][seriesIndex] :
                    null,
                ]),
            ...args));
    }
    addSeries(chart, ...args) {
        seriesConf.forEach(conf =>
            this.series.push(
                chart.addSeries(conf, ...args)
            )
        );
    }
    getYAxis() {
        return yAxis;
    }
    destroy() {
        const axis = this.chart.get('macd-axis');

        if (axis) {
            axis.remove(true);
            this.series = this.conf = this.chart = null;
        }
    }
}

