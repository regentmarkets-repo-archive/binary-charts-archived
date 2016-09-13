import { tickToData, ohlcToData, getLast, doArrayDifferJustOneEntry, nowAsEpoch } from 'binary-utils';
import seriesLine from './seriesLine';
import chartTypeToDataType from '../utils/chartTypeToDataType';
import getSeriesByType from '../utils/getSeriesByType';
import getMainSeries from '../utils/getMainSeries';

const createFutureSeries = (futureEpoch: number, lastChartData: number[]) => {
    const futureDataPoint = [futureEpoch * 1000, lastChartData[1]];
    return seriesLine([futureDataPoint], 0, 'line', 'future', true)[0];
};

const showSeriesByType = (chart, chartType) => {
    const mainTickSeries = getSeriesByType(chart, 'line');
    const mainOhlcSeries = getSeriesByType(chart, 'ohlc');
    const dataType = chartTypeToDataType(chartType);
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
};

export default (chart: Chart, nextProps: any, contract: Contract) => {
    const chartType = nextProps.type;
    const dataType = chartTypeToDataType(chartType);

    const { dataMax, min, max } = chart.xAxis[0].getExtremes();
    const mainSeries = getMainSeries(chart);
    const dataInChart = mainSeries ? mainSeries.options.data : [];
    const pipSize = chart.userOptions.binary.pipSize;

    const nowEpoch = nowAsEpoch();
    const contractStartLater = contract && contract.date_start > nowEpoch;
    const prevFutureSeries = chart.get('future');
    const hasFutureSeries = !!prevFutureSeries;
    const prevStartLaterMillis = prevFutureSeries && prevFutureSeries.options.data[0][0];
    const isStartLaterNewlyAdded = contractStartLater && (!hasFutureSeries || contract.date_start * 1000 !== prevStartLaterMillis);

    const newDataInChartFormat = nextProps.ticks.map(dataType === 'ticks' ? tickToData : ohlcToData);
    const oneTickDiff = doArrayDifferJustOneEntry(
        dataInChart,
        newDataInChartFormat,
        (a, b) => a === b || a[0] === b[0]
    );
    const lastestNewData = getLast(newDataInChartFormat);

    // closures
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

    showSeriesByType(chart, chartType);

    switch (dataType) {
        case 'ticks': {
            if (oneTickDiff) {
                if (!lastestNewData) {
                    return;
                }

                // add new data to existing series
                if (mainSeries) {
                    mainSeries.addPoint(lastestNewData, false);
                } else {
                    addNewseries([lastestNewData]);
                }

                // handle future data
                const newDataMax = lastestNewData[0];

                if (contractStartLater && isStartLaterNewlyAdded) {
                    addStartLaterData(lastestNewData);
                    shiftToRightWhenCloseEnough(contract.date_start * 1000, (dataMax - max) < 2000);
                } else if (!contractStartLater && hasFutureSeries){
                    removeStartLaterData();
                    const mainSeriesMax = getLast(dataInChart)[0];
                    if (mainSeriesMax < max) {
                        chart.xAxis[0].setExtremes(min, mainSeriesMax);
                    } else {
                        shiftToRightWhenCloseEnough(newDataMax, (dataMax - max) < 2000);
                    }
                } else {
                    shiftToRightWhenCloseEnough(newDataMax, (dataMax - max) < 2000);
                }
            } else {
                if (mainSeries) {
                    mainSeries.setData(newDataInChartFormat, false);
                } else {
                    addNewseries(newDataInChartFormat);
                }

                // handle future data
                if (contractStartLater && isStartLaterNewlyAdded) {
                    addStartLaterData(lastestNewData);
                    chart.xAxis[0].setExtremes(newDataInChartFormat[0][0], contract.date_start * 1000);
                } else if (contractStartLater && hasFutureSeries) {
                    removeStartLaterData();
                }
            }
            break;
        }
        case 'candles': {
            if (oneTickDiff) {
                const xData = mainSeries.xData;
                const last2Epoch = xData[xData.length - 2];
                const last3Epoch = xData[xData.length - 3];
                const timeInterval = last2Epoch - last3Epoch;

                const newDataIsWithinInterval = (lastestNewData[0] - last2Epoch) <= timeInterval;
                if (newDataIsWithinInterval) {
                    dataInChart[xData.length - 1] = lastestNewData;
                } else if (mainSeries) {
                    mainSeries.addPoint(lastestNewData, false);
                } else {
                    addNewseries([lastestNewData]);
                }

                const newDataMax = lastestNewData[0];
                if (contractStartLater && isStartLaterNewlyAdded) {
                    addStartLaterData(lastestNewData);
                    shiftToRightWhenCloseEnough(contract.date_start * 1000, (dataMax - max) < 100000);
                } else if (contractStartLater && hasFutureSeries) {
                    removeStartLaterData();
                    const mainSeriesMax = getLast(dataInChart)[0];
                    if (mainSeriesMax < max) {
                        chart.xAxis[0].setExtremes(min, mainSeriesMax);
                    } else {
                        shiftToRightWhenCloseEnough(newDataMax, (dataMax - max) < 100000);
                    }
                } else {
                    shiftToRightWhenCloseEnough(newDataMax, (dataMax - max) < 100000);
                }
            } else {
                if (mainSeries) {
                    mainSeries.setData(newDataInChartFormat, false);
                } else {
                    addNewseries(newDataInChartFormat);
                }

                if (contractStartLater && isStartLaterNewlyAdded) {
                    addStartLaterData(lastestNewData);
                    chart.xAxis[0].setExtremes(newDataInChartFormat[0][0], contract.date_start * 1000);
                } else if (!contractStartLater && hasFutureSeries){
                    removeStartLaterData();
                }
            }
            break;
        }
        default:
            throw new Error('Unexpected highchart series type: ', chartType);
    }
};
