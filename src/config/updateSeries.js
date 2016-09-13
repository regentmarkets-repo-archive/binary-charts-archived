import { tickToData, ohlcToData, getLast, doArrayDifferJustOneEntry } from 'binary-utils';
import seriesLine from './seriesLine';
import chartTypeToDataType from '../utils/chartTypeToDataType';
import getSeriesByType from '../utils/getSeriesByType';
import getMainSeries from '../utils/getMainSeries';

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

export default (chart: Chart, nextProps: any) => {
    const chartType = nextProps.type;
    const dataType = chartTypeToDataType(chartType);

    const { dataMax, min, max } = chart.xAxis[0].getExtremes();
    const mainSeries = getMainSeries(chart);
    const dataInChart = mainSeries ? mainSeries.options.data : [];
    const pipSize = chart.userOptions.binary.pipSize;

    const newDataInChartFormat = nextProps.ticks.map(dataType === 'ticks' ? tickToData : ohlcToData);
    const oneTickDiff = doArrayDifferJustOneEntry(
        dataInChart,
        newDataInChartFormat,
        (a, b) => a === b || a[0] === b[0]
    );
    const lastestNewData = getLast(newDataInChartFormat);

    if (!lastestNewData) {
        return;
    }

    // closures
    const addNewseries = data => chart.addSeries(seriesLine(data, pipSize, chartType)[0], false);
    const shiftToRightWhenCloseEnough = (newDataMax: number, threshold: number) => {
        const futureSeries = chart.get('future');
        if (!futureSeries) {
            const isCloseEnough = (dataMax - max) <= threshold;
            if (isCloseEnough) {
                const hasNullData = dataInChart.some(d => !d[1] && d[1] !== 0);
                if (!hasNullData) {
                    const newMin = min + (newDataMax - dataMax);
                    const fixedRange = chart.userOptions.binary.shiftMode === 'fixed';
                    chart.xAxis[0].setExtremes(fixedRange ? newMin : min, newDataMax, false);
                } else {
                    const lastDataPoint: any = getLast(dataInChart);
                    const xAxisDiff = newDataMax - lastDataPoint[0];
                    chart.xAxis[0].setExtremes(min + xAxisDiff, dataMax, false);
                }
            }
        }
    };

    showSeriesByType(chart, chartType);

    switch (dataType) {
        case 'ticks': {
            if (oneTickDiff) {
                // add new data to existing series
                if (mainSeries) {
                    mainSeries.addPoint(lastestNewData, false);
                } else {
                    addNewseries([lastestNewData]);
                }

                shiftToRightWhenCloseEnough(lastestNewData[0], 2000);
            } else if (mainSeries) {
                mainSeries.setData(newDataInChartFormat, false);
            } else {
                addNewseries(newDataInChartFormat);
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

                shiftToRightWhenCloseEnough(lastestNewData[0], 100000);
            } else if (mainSeries) {
                mainSeries.setData(newDataInChartFormat, false);
            } else {
                addNewseries(newDataInChartFormat);
            }
            break;
        }
        default:
            throw new Error('Unexpected highchart series type: ', chartType);
    }
};
