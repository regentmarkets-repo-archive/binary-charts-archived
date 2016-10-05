import { simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage';
import { exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage';
import { bollingerBandsArray } from 'binary-indicators/lib/bollingerBands';
import createSeries from './createSeries';

export default (chart, newData, indicatorConfs) => {
    /**
     * 1. init 2 series for indicator if not yet exist, named indicator0, indicator1
     * 2. compute series for each element in indicatorConfigs
     */

    if (!newData || newData.length === 0) return;

    if (!chart.get('indicator0')) {
        const pipSize = chart.userOptions.binary.pipSize;
        chart.addSeries(createSeries('indicator', 'line', [], pipSize, 'indicator0'));
        chart.addSeries(createSeries('indicator', 'line', [], pipSize, 'indicator1'));
    }

    indicatorConfs.forEach((conf, idx) => {
        const isOHLC = !!newData[0].open;
        const yData = isOHLC ? newData.map(d => +d.close) : newData.map(d => +d.quote);

        let indicatorYData = [];

        // todo: maybe wrap this block with try catch ?
        // or hard code contraints on high-layer?
        switch (conf.type.toLowerCase()) {
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
        const indicatorSeries = chart.get(`indicator${idx}`);
        indicatorSeries.update({ name: conf.name || conf.type });
        indicatorSeries.setData(indicatorData);
    });
};
