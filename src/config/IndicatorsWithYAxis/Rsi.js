import { relativeStrengthIndexArray } from 'binary-indicators/lib/relativeStrengthIndex';

export const yAxis = {
    tickInterval: 10,
    min: 0,
    max: 100,
    title: {
        text: 'RSI - 14',
        rotation: 0,
        margin: -40,
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

export const getData = (chartData, conf) => {
    if (chartData.length < conf.periods) {
        return [];
    }
    const isOHLC = !!chartData[0].open;
    const yData = isOHLC ? chartData.map(d => +d.close) : chartData.map(d => +d.quote);
    const data = relativeStrengthIndexArray(yData, conf);
    const dataLengthDiff = chartData.length - data.length;
    return chartData.map((d, i) => [
        d.epoch * 1000,
        i > dataLengthDiff ?
        data[i - dataLengthDiff] :
        null,
    ]);
};
