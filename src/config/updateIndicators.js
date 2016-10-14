import { simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage';
import { exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage';
import { bollingerBandsArray } from 'binary-indicators/lib/bollingerBands';
import createSeries from './createIndicatorSeries';
import { indicatorColors } from '../styles';

const indicatorsSeriesPoolIds = Array(...Array(5)).map((v, i) => `indicator${i}`);

export default (chart, newData, indicatorConfs) => {
    if (!newData || newData.length === 0) return;

    if (!chart.get('indicator0')) {
        indicatorsSeriesPoolIds.forEach(id => {
            chart.addSeries(createSeries('indicator', [], id));
        });
    }

    const isOHLC = !!newData[0].open;
    const yData = isOHLC ? newData.map(d => +d.close) : newData.map(d => +d.quote);

    const seriesDataByIndicators = indicatorConfs.map(conf => {
        switch (conf.class.toLowerCase()) {
            case 'sma':
                return [{ id: 'sma', name: 'Simple moving average', data: simpleMovingAverageArray(yData, conf) }];
            case 'ema':
                return [{ id: 'ema', name: 'Exponential moving average', data: exponentialMovingAverageArray(yData, conf) }];
            case 'bb': {
                const bbData = bollingerBandsArray(yData, conf);
                const middle = [];
                const upper = [];
                const lower = [];

                bbData.forEach(d => {
                    middle.push(d[0]);
                    upper.push(d[1]);
                    lower.push(d[2]);
                });

                return [
                    { id: 'bb', name: 'Bollinger band', data: middle },
                    { id: 'bb', name: 'Bollinger band', data: upper },
                    { id: 'bb', name: 'Bollinger band', data: lower },
                    ];
            }
            default:
                return [];
        }
    });

    const flattenIndicatorsData = [].concat(...seriesDataByIndicators);

    indicatorsSeriesPoolIds.forEach((seriesId, idx) => {
        const indicatorObj = flattenIndicatorsData[idx];
        const indicatorSeries = chart.get(seriesId);

        if (!indicatorObj) {
            indicatorSeries.setData([], false);
            return;
        }

        const seriesData = indicatorObj.data;

        const indexOffset = newData.length - seriesData.length;

        const indicatorData = seriesData.map((y, i) => [+newData[i + indexOffset].epoch * 1000, y]);

        indicatorSeries.update({ name: indicatorObj.name, color: indicatorColors[indicatorObj.id] }, false);
        indicatorSeries.setData(indicatorData, false);
    });
};
