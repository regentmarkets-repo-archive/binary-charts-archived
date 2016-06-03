import doTicksDifferJustOneEntry from 'binary-utils/lib/doTicksDifferJustOneEntry';
import tickToData from 'binary-utils/lib/tickToData';
import ohlcToData from 'binary-utils/lib/ohlcToData';
import getLastTick from 'binary-utils/lib/getLastTick';

export default (chart, prevProps, nextProps) => {
    const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);
    if (oneTickDiff) {
        const lastTick = getLastTick(nextProps.ticks);
        const chartType = chart.series[0].type;

        if (chartType === 'area') {
            const dataPoint = tickToData(lastTick);
            chart.series[0].addPoint(dataPoint, false);
        } else if (chartType === 'candlestick') {
            const dataPoint = ohlcToData(lastTick);
            const xData = chart.series[0].xData;
            const last2Epoch = xData[xData.length - 2];
            const last3Epoch = xData[xData.length - 3];
            const timeInterval = last2Epoch - last3Epoch;

            const newDataIsWithinInterval = (dataPoint[0] - last2Epoch) <= timeInterval;
            if (newDataIsWithinInterval) {
                chart.series[0].options.data[xData.length - 1] = dataPoint;
            } else {
                chart.series[0].addPoint(dataPoint, false);
            }
        }
    } else {
        const dataList =
            chart.series[0].type === 'area' ?
                nextProps.ticks.map(tickToData) :
                nextProps.ticks.map(ohlcToData);
        chart.series[0].setData(dataList, false);
    }
    chart.binary.ticks = nextProps.ticks;
};
