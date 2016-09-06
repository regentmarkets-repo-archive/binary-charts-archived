import { tickToData, ohlcToData, getLast, doArrayDifferJustOneEntry, nowAsEpoch } from 'binary-utils';
import seriesLine from '../parts/seriesLine';
import chartTypeToDataType from '../utils/chartTypeToDataType';
import getSeriesByType from '../utils/getSeriesByType';

export const patchNullDataForStartLaterContract = (chart: Chart, contract: Contract, newData: ChartTick[]) => {
    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();
    const dataInChart = chart.series[0].options.data;
    const visiblePointCount = dataInChart.filter(d => d[0] > min && d[0] < max).length;
    const emptyDataCount = visiblePointCount * 0.1;         // keep 10% space for empty data

    const lastTick: any = getLast(newData);
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

export default (chart: Chart, nextProps: any, contract: Contract) => {
    const chartType = nextProps.type;

    // by hiding series, we remove the need of chart creation
    const dataType = chartTypeToDataType(chartType);
    const mainTickSeries = getSeriesByType(chart, 'line');
    const mainOhlcSeries = getSeriesByType(chart, 'ohlc');
    switch (dataType) {
        case 'tick':
            if (mainOhlcSeries) mainOhlcSeries.hide();
            if (mainTickSeries) {
                mainTickSeries.show();
                mainTickSeries.update({ type: chartType });
            }
            break;
        case 'ohlc':
            if (mainTickSeries) mainTickSeries.hide();
            if (mainOhlcSeries) {
                mainOhlcSeries.show();
                mainOhlcSeries.update({ type: chartType });
            }
            break;
        default: throw new Error(`Unknown data type: ${dataType}`);
    }

    const { dataMax, min, max } = chart.xAxis[0].getExtremes();
    const dataInChart = chart.get(`main-${dataType}`) ? chart.get(`main-${dataType}`).options.data : [];
    let newDataMax = dataMax;
    const pipSize = chart.userOptions.binary.pipSize;

    const addNewseries = data => {
        chart.addSeries(seriesLine(data, pipSize, chartType)[0]);
    };

    switch (chartType) {
        case 'line':
        case 'area': {
            const newDataInChartFormat = nextProps.ticks.map(tickToData);

            const oneTickDiff = doArrayDifferJustOneEntry(
                dataInChart,
                newDataInChartFormat,
                (a, b) => a === b || a[0] === b[0]
            );
            const tickSeries = mainTickSeries;

            if (oneTickDiff) {
                const newTick: any = getLast(nextProps.ticks);
                const dataPoint = tickToData(newTick);
                if (!dataPoint) {
                    return;
                }

                if (tickSeries) {
                    tickSeries.addPoint(dataPoint, false);
                } else {
                    addNewseries([dataPoint]);
                }

                newDataMax = dataPoint[0];

                const isCloseToMostRecent = (dataMax - max) <= 2000;
                if (isCloseToMostRecent) {
                    const hasNullData = dataInChart.some(d => !d[1] && d[1] !== 0);
                    if (!hasNullData) {
                        const newMin = min + (newDataMax - dataMax);
                        const fixedRange = chart.userOptions.binary.shiftMode === 'fixed';
                        chart.xAxis[0].setExtremes(fixedRange ? newMin : min, newDataMax);
                    } else {
                        const lastDataPoint: any = getLast(dataInChart);
                        const xAxisDiff = newDataMax - lastDataPoint[0];
                        chart.xAxis[0].setExtremes(min + xAxisDiff, dataMax);
                    }
                }
            } else if (contract && contract.date_start > nowAsEpoch()) {
                const dataWithNull = patchNullDataForStartLaterContract(chart, contract, newDataInChartFormat);
                if (tickSeries) {
                    tickSeries.setData(dataWithNull, false);
                } else {
                    addNewseries(dataWithNull);
                }
            } else if (tickSeries) {
                tickSeries.setData(newDataInChartFormat, false);
            } else {
                addNewseries(newDataInChartFormat);
            }
            break;
        }
        case 'ohlc':
        case 'candlestick': {
            const newDataInChartFormat = nextProps.ticks.map(ohlcToData);
            const oneTickDiff = doArrayDifferJustOneEntry(
                dataInChart,
                newDataInChartFormat,
                (a, b) => a === b || a[0] === b[0]
            );

            const ohlcSeries = mainOhlcSeries;
            if (oneTickDiff) {
                const dataPoint: any = getLast(newDataInChartFormat);
                const xData = ohlcSeries.xData;
                const last2Epoch = xData[xData.length - 2];
                const last3Epoch = xData[xData.length - 3];
                const timeInterval = last2Epoch - last3Epoch;

                const newDataIsWithinInterval = (dataPoint[0] - last2Epoch) <= timeInterval;
                if (newDataIsWithinInterval) {
                    dataInChart[xData.length - 1] = dataPoint;
                } else if (ohlcSeries) {
                    ohlcSeries.addPoint(dataPoint, false);
                } else {
                    addNewseries([dataPoint]);
                }
            } else if (ohlcSeries) {
                ohlcSeries.setData(newDataInChartFormat, false);
            } else {
                addNewseries(newDataInChartFormat);
            }
            break;
        }
        default:
            throw new Error('Unexpected highchart series type: ', chartType);
    }
};
