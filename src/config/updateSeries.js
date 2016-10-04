import { tickToData, ohlcToData, getLast, doArrayDifferJustOneEntry } from 'binary-utils';
import createSeries from './createSeries';
import chartTypeToDataType from '../utils/chartTypeToDataType';
import getMainSeries from '../utils/getMainSeries';

const showSeriesByType = (chart, chartType) => {
    const mainSeries = getMainSeries(chart);

    if (mainSeries && mainSeries.options.type !== chartType) {
        mainSeries.remove();
    }
};

export default (chart: Chart, nextProps: any) => {
    const chartType = nextProps.type;

    showSeriesByType(chart, chartType);

    const dataType = chartTypeToDataType(chartType);
    const { dataMax, min, max } = chart.xAxis[0].getExtremes();

    const mainSeries = getMainSeries(chart);
    const dataInChart = mainSeries ? mainSeries.options.data : [];
    const pipSize = chart.userOptions.binary.pipSize;

    const newDataInChartFormat = nextProps.ticks.map(dataType === 'ticks' ? tickToData : ohlcToData);

    const lastestNewData = getLast(newDataInChartFormat);
    if (!lastestNewData) {
        return;
    }

    const oneTickDiff = doArrayDifferJustOneEntry(
        dataInChart,
        newDataInChartFormat,
        (a, b) => a && b && (a === b || a[0] === b[0])
    );

    const closeEnoughThreshold = dataType === 'ticks' ? 2000 : 100000;

    // closures
    const addNewSeries = data =>
        chart.addSeries(createSeries(nextProps.assetName, chartType, data, pipSize), false);

    const shiftToRightWhenCloseEnough = (newDataMax: number, threshold: number) => {
        const futureSeries = chart.get('future');
        if (!futureSeries) {
            const isCloseEnough = (dataMax - max) <= threshold;
            if (isCloseEnough) {
                const newMin = min + (newDataMax - dataMax);
                const fixedRange = chart.userOptions.binary.shiftMode === 'fixed';
                chart.xAxis[0].setExtremes(fixedRange ? newMin : min, newDataMax, false);
            }
        } else {
            // if future exist, do not change x extreme's min
            chart.xAxis[0].setExtremes(min, max, false);
        }
    };

    if (oneTickDiff) {
        if (mainSeries) {
            mainSeries.addPoint(lastestNewData, false);
        } else {
            addNewSeries([lastestNewData]);
        }
        shiftToRightWhenCloseEnough(lastestNewData[0], closeEnoughThreshold);
    } else if (mainSeries) {
        mainSeries.setData(newDataInChartFormat, false);
    } else {
        addNewSeries(newDataInChartFormat);
    }
};
