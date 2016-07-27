import { doTicksDifferJustOneEntry, doCandlesDifferJustOneEntry,
    tickToData, ohlcToData, getLastTick } from 'binary-utils';

export default (chart, prevProps, nextProps) => {
    const chartType = chart.series[0].type;
    const { dataMax, min, max } = chart.xAxis[0].getExtremes();
    let newDataMax = dataMax;
    switch (chartType) {
        case 'area': {
            const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);
            if (oneTickDiff) {
                const newTick = getLastTick(nextProps.ticks);
                const dataPoint = tickToData(newTick);
                if (!dataPoint) {
                    return;
                }
                chart.series[0].addPoint(dataPoint, false);
                newDataMax = dataPoint[0];

                const isCloseToMostRecent = (dataMax - max) <= 2000;
                if (isCloseToMostRecent) {
                    const hasNullData = chart.series[0].options.data.some(d => !d[1] && d[1] !== 0);
                    if (!hasNullData) {
                        const newMin = min + (newDataMax - dataMax);
                        chart.xAxis[0].setExtremes(newMin, newDataMax);
                    } else {
                        const lastTick = getLastTick(prevProps.ticks);
                        const lastDataPoint = tickToData(lastTick);
                        const xAxisDiff = newDataMax - lastDataPoint[0];
                        chart.xAxis[0].setExtremes(min + xAxisDiff, dataMax);
                    }
                }
            } else {
                const dataList = nextProps.ticks.map(tickToData);
                chart.series[0].setData(dataList, false);
            }
            break;
        }
        case 'candlestick': {
            const oneTickDiff = doCandlesDifferJustOneEntry(prevProps.ticks, nextProps.ticks);
            if (oneTickDiff) {
                const lastTick = getLastTick(nextProps.ticks);
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
            } else {
                const dataList = nextProps.ticks.map(ohlcToData);
                chart.series[0].setData(dataList, false);
            }
            break;
        }
        default:
            throw new Error('Unexpected highchart series type: ', chartType);
    }
};
