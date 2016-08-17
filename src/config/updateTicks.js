import { tickToData, ohlcToData, getLastTick, doArrayDifferJustOneEntry } from 'binary-utils';

export const patchNullDataForStartLaterContract = (chart, contract, newData) => {
    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();
    const dataInChart = chart.series[0].options.data;
    const visiblePointCount = dataInChart.filter(d => d[0] > min && d[0] < max).length;
    const emptyDataCount = visiblePointCount * 0.1;         // keep 10% space for empty data

    const lastTick = getLastTick(newData);
    const lastTickMillis = lastTick && lastTick[0];
    const startTime = contract && contract.date_start;
    if (!startTime) return newData;

    const startTimeMillis = startTime && startTime * 1000;
    const blankWindowSize = startTimeMillis - lastTickMillis;
    const blankWindowInterval = blankWindowSize / (emptyDataCount * 0.5);

    const newSeries = newData;
    for (let i = 1; i <= emptyDataCount; i++) {
        const futurePoint = [lastTickMillis + (blankWindowInterval * i), null];
        newSeries.push(futurePoint);
    }
    return newSeries;
};

export default (chart, nextProps, contract) => {
    const chartType = chart.series[0].type;
    const { dataMax, min, max } = chart.xAxis[0].getExtremes();
    const dataInChart = chart.series[0].options.data;
    let newDataMax = dataMax;
    switch (chartType) {
        case 'area': {
            const newDataInChartFormat = nextProps.ticks.map(tickToData);

            const oneTickDiff = doArrayDifferJustOneEntry(
                dataInChart,
                newDataInChartFormat,
                (a, b) => a === b || a[0] === b[0]
            );

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
                    const hasNullData = dataInChart.some(d => !d[1] && d[1] !== 0);
                    if (!hasNullData) {
                        const newMin = min + (newDataMax - dataMax);
                        chart.xAxis[0].setExtremes(newMin, newDataMax);
                    } else {
                        const lastDataPoint = getLastTick(dataInChart);
                        const xAxisDiff = newDataMax - lastDataPoint[0];
                        chart.xAxis[0].setExtremes(min + xAxisDiff, dataMax);
                    }
                }
            } else if (contract && contract.date_start) {
                const dataWithNull = patchNullDataForStartLaterContract(chart, contract, newDataInChartFormat);
                chart.series[0].setData(dataWithNull, false);
            } else {
                chart.series[0].setData(newDataInChartFormat, false);
            }
            break;
        }
        case 'candlestick': {
            const newDataInChartFormat = nextProps.ticks.map(ohlcToData);
            const oneTickDiff = doArrayDifferJustOneEntry(
                dataInChart,
                newDataInChartFormat,
                (a, b) => a === b || a[0] === b[0]
            );
            if (oneTickDiff) {
                const dataPoint = getLastTick(newDataInChartFormat);
                const xData = chart.series[0].xData;
                const last2Epoch = xData[xData.length - 2];
                const last3Epoch = xData[xData.length - 3];
                const timeInterval = last2Epoch - last3Epoch;

                const newDataIsWithinInterval = (dataPoint[0] - last2Epoch) <= timeInterval;
                if (newDataIsWithinInterval) {
                    dataInChart[xData.length - 1] = dataPoint;
                } else {
                    chart.series[0].addPoint(dataPoint, false);
                }
            } else {
                chart.series[0].setData(newDataInChartFormat, false);
            }
            break;
        }
        default:
            throw new Error('Unexpected highchart series type: ', chartType);
    }
};
