import { tickToData, ohlcToData, getLast, doArrayDifferJustOneEntry, nowAsEpoch } from 'binary-utils';
import seriesLine from './seriesLine';
import chartTypeToDataType from '../utils/chartTypeToDataType';
import getSeriesByType from '../utils/getSeriesByType';
import getMainSeries from '../utils/getMainSeries';

export const createFutureSeries = (futureEpoch: number, lastChartData) => {
    const futureDataPoint = [futureEpoch * 1000, lastChartData[1]];
    return seriesLine([futureDataPoint], 0, 'line', 'future', true)[0];
};

export default (chart: Chart, nextProps: any, contract: Contract) => {
    const chartType = nextProps.type;

    // by hiding series, we remove the need of chart creation
    const dataType = chartTypeToDataType(chartType);
    const mainTickSeries = getSeriesByType(chart, 'line');
    const mainOhlcSeries = getSeriesByType(chart, 'ohlc');

    switch (dataType) {
        case 'ticks':
            if (mainOhlcSeries) mainOhlcSeries.hide();
            if (mainTickSeries) {
                mainTickSeries.show();
                mainTickSeries.update({ type: chartType });
            }
            break;
        case 'candles':
            if (mainTickSeries) mainTickSeries.hide();
            if (mainOhlcSeries) {
                mainOhlcSeries.show();
                mainOhlcSeries.update({ type: chartType });
            }
            break;
        default: throw new Error(`Unknown data type: ${dataType}`);
    }

    const { dataMax, min, max } = chart.xAxis[0].getExtremes();
    const dataInChart = getMainSeries(chart) ? getMainSeries(chart).options.data : [];
    const pipSize = chart.userOptions.binary.pipSize;
    const nowEpoch = nowAsEpoch();

    const addNewseries = data => chart.addSeries(seriesLine(data, pipSize, chartType)[0], false);

    const addStartLaterData = (lastData) => {
        const futureSeries = createFutureSeries(contract.date_start, lastData);
        chart.addSeries(futureSeries, false);
    };

    const removeStartLaterData = () => {
        const futureSeries = chart.get('future');
        if (futureSeries) {
            futureSeries.remove(false);
        }
    };

    const shiftToRightWhenCloseEnough = (newDataMax: number, isCloseEnough: Boolean) => {
        if (isCloseEnough) {
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
            const lastestNewData = getLast(newDataInChartFormat);

            const contractStartLater = contract && contract.date_start > nowEpoch;

            if (oneTickDiff) {
                if (!lastestNewData) {
                    return;
                }

                // add new data to existing series
                if (tickSeries) {
                    tickSeries.addPoint(lastestNewData, false);
                } else {
                    addNewseries([lastestNewData]);
                }

                // handle future data
                const newDataMax = lastestNewData[0];
                if (contractStartLater) {
                    addStartLaterData(lastestNewData);
                    shiftToRightWhenCloseEnough(contract.date_start * 1000, (dataMax - max) < 2000);
                } else if (chart.get('future')){
                    // if not start in future but contains future series
                    removeStartLaterData();
                    const mainSeriesMax = getLast(dataInChart)[0];
                    if (mainSeriesMax < max) {
                        chart.xAxis[0].setExtremes(min, mainSeriesMax);
                    } else {
                        shiftToRightWhenCloseEnough(newDataMax, (dataMax - max) < 2000);
                    }
                } else {
                    // normal case, no future data
                    shiftToRightWhenCloseEnough(newDataMax, (dataMax - max) < 2000);
                }
            } else {
                if (tickSeries) {
                    tickSeries.setData(newDataInChartFormat, false);
                } else {
                    addNewseries(newDataInChartFormat);
                }

                // handle future data
                if (contractStartLater) {
                    addStartLaterData(lastestNewData);
                    chart.xAxis[0].setExtremes(newDataInChartFormat[0][0], contract.date_start * 1000);
                } else {
                    removeStartLaterData();
                }
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

                const newDataMax = dataPoint[0];

                // shift only happens when interval are small enough,
                // assuming live data does not matter much when interval is huge
                shiftToRightWhenCloseEnough(newDataMax, (dataMax - max) < 100000);
            } else if (ohlcSeries) {
                ohlcSeries.setData(newDataInChartFormat, false);
            } else {
                addNewseries(newDataInChartFormat);
            }

            addStartLaterData(getLast(newDataInChartFormat));

            break;
        }
        default:
            throw new Error('Unexpected highchart series type: ', chartType);
    }
};
