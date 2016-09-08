import { getLast } from 'binary-utils';

const lastPriceFromCandles = series => {
    const lastCandle = getLast(series.yData);
    return lastCandle && lastCandle[3];
};

const lastPriceFromTicks = series => {
    const nonNullSeries = series.yData.length && series.yData.filter(d => !!d || d === 0);
    return getLast(nonNullSeries);
};

export default series =>
    (series.type === 'candlestick') ?
        lastPriceFromCandles(series) :
        lastPriceFromTicks(series);
