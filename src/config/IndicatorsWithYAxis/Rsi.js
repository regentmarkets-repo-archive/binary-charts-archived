import { relativeStrengthIndexArray } from 'binary-indicators/lib/relativeStrengthIndex';
import { indicatorColors } from '../../styles';

const yAxis = {
    tickInterval: 10,
    min: 0,
    max: 100,
    title: {
        text: 'RSI - 14',
        rotation: 90,
        margin: -30,
    },
    plotLines: [{
        value: 70,
        color: '#000',
        dashStyle: 'shortdash',
        width: 2,
    }, {
        value: 30,
        color: '#000',
        dashStyle: 'shortdash',
        width: 2,
    }],
    name: 'RSI',
};

const seriesConf = [
    {
        id: 'rsi-series',
        name: 'RSI',
        type: 'line',
        color: indicatorColors.rsi,
        yAxis: 'rsi-axis',
        dataGrouping: {
            enabled: false,
        }
    },
];

const defaultConf = {
    periods: 14,
};

export default class Rsi {
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
        const data = relativeStrengthIndexArray(yData, this.conf);
        const dataLengthDiff = chartData.length - data.length;
        this.series.forEach(s =>
            s.setData(
                chartData.map((d, i) => [
                    d.epoch * 1000,
                    i > dataLengthDiff ?
                    data[i - dataLengthDiff] :
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
        const axis = this.chart.get('rsi-axis');

        if (axis) {
            axis.remove(true);
            this.series = this.conf = this.chart = null;
        }
    }
}

