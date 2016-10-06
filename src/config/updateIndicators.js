import { simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage';
import { exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage';
import { bollingerBandsArray } from 'binary-indicators/lib/bollingerBands';
import createSeries from './createSeries';

const indicatorsSeriesPoolIds = Array.apply(null, Array(5)).map((v, i) => `indicator${i}`);

export default (chart, newData, indicatorConfs) => {
    if (!newData || newData.length === 0) return;

    if (!chart.get('indicator0')) {
        const pipSize = chart.userOptions.binary.pipSize;
        indicatorsSeriesPoolIds.forEach(id => {
            chart.addSeries(createSeries('indicator', 'line', [], pipSize, id));
        });
    }

    indicatorsSeriesPoolIds.forEach((seriesId, idx) => {
        const conf = indicatorConfs[idx];
        const indicatorSeries = chart.get(seriesId);

        if (!conf) {
            indicatorSeries.setData([], false);
            return;
        }

        const isOHLC = !!newData[0].open;
        const yData = isOHLC ? newData.map(d => +d.close) : newData.map(d => +d.quote);

        let indicatorYData = [];

        // todo: maybe wrap this block with try catch ?
        // or hard code contraints on high-layer?
        switch (conf.class.toLowerCase()) {
            case 'sma':
                indicatorYData = simpleMovingAverageArray(yData, conf);
                break;
            case 'ema':
                indicatorYData = exponentialMovingAverageArray(yData, conf);
                break;
            case 'bb':
                indicatorYData = bollingerBandsArray(yData, conf);
                break;
            default:
            // do nothing
        }

        const indexOffset = newData.length - indicatorYData.length;

        const indicatorData = indicatorYData.map((y, i) => [+newData[i + indexOffset].epoch * 1000, y]);
        indicatorSeries.update({ name: conf.name || conf.type }, false);
        indicatorSeries.setData(indicatorData, false);
    });
};
