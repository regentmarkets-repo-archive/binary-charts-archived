import { simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage';
import { exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage';
import { bollingerBandsArray } from 'binary-indicators/lib/bollingerBands';
import createSeries from './createSeries';

const indicatorsSeriesPoolIds = Array(...Array(5)).map((v, i) => `indicator${i}`);

export default (chart, newData, indicatorConfs) => {
    if (!newData || newData.length === 0) return;

    if (!chart.get('indicator0')) {
        const pipSize = chart.userOptions.binary.pipSize;
        indicatorsSeriesPoolIds.forEach(id => {
            chart.addSeries(createSeries('indicator', 'line', [], pipSize, id));
        });
    }

    const isOHLC = !!newData[0].open;
    const yData = isOHLC ? newData.map(d => +d.close) : newData.map(d => +d.quote);

    const seriesDataByIndicators = indicatorConfs.map(conf => {
        switch (conf.class.toLowerCase()) {
            case 'sma':
                return [simpleMovingAverageArray(yData, conf)];
            case 'ema':
                return [exponentialMovingAverageArray(yData, conf)];
            case 'bb':
                const bbData = bollingerBandsArray(yData, conf);
                const middle = [];
                const upper = [];
                const lower = [];

                bbData.forEach(d => {
                    middle.push(d[0]);
                    upper.push(d[1]);
                    lower.push(d[2]);
                });

                return [middle, upper, lower];
            default:
                return [];
        }
    });

    const flattenSeriesData = [].concat.apply([], seriesDataByIndicators);

    indicatorsSeriesPoolIds.forEach((seriesId, idx) => {
        const seriesData = flattenSeriesData[idx];
        const indicatorSeries = chart.get(seriesId);

        if (!seriesData) {
            indicatorSeries.setData([], false);
            return;
        }

        const indexOffset = newData.length - seriesData.length;

        const indicatorData = seriesData.map((y, i) => [+newData[i + indexOffset].epoch * 1000, y]);
        indicatorSeries.setData(indicatorData, false);
    });
};
