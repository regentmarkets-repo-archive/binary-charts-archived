import { simpleMovingAverageArray } from 'binary-indicators/lib/simpleMovingAverage';
import { exponentialMovingAverageArray } from 'binary-indicators/lib/exponentialMovingAverage';
import { bollingerBandsArray } from 'binary-indicators/lib/bollingerBands';
import createSeries from './createSeries';

const updateSMA = (chart, newData) => {
    let smaSeries = chart.get('sma');

    if (!smaSeries) {
        chart.addSeries(createSeries('idc', 'line', [], 2, 'sma'), false);
        smaSeries = chart.get('sma');
    }

    const isOHLC = !!newData[0].open;

    const yData = isOHLC ? newData.map(d => +d.close) : newData.map(d => +d.quote);

    const smaYData = simpleMovingAverageArray(yData, { periods: 2 });
    const indexOffset = newData.length - smaYData.length;

    const smaData = smaYData.map((y, i) => [+newData[i + indexOffset].epoch * 1000, y]);

    smaSeries.setData(smaData, false);
};



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

    indicatorConfs.forEach((conf, i) => {
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
        const indicatorSeries = chart.get(`indicator${i}`);
        indicatorSeries.update({ name: conf.name || conf.type });
        indicatorSeries.setData(indicatorData);
    });
};
