import { getLast } from 'binary-utils';
import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';

export default (chart: Chart, contract: Object, lastData: Object) => {
    const startEpoch = contract.date_start;
    const exitEpoch = contract.date_expiry;

    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();

    if (!lastData || !min || !max) return;

    const lastEpoch = lastData.epoch;
    const startInFuture = startEpoch && startEpoch > lastEpoch;
    const endInFuture = exitEpoch && exitEpoch > lastEpoch;

    const doesInvolveFuture = startInFuture || endInFuture;

    const oldSeries = chart.get('future');

    if (!doesInvolveFuture) {
        if (oldSeries) {
            oldSeries.remove();
            const mainSeries = getMainSeries(chart);
            mainSeries.update({ dataGrouping: { enabled: true } });
            const mainSeriesMax = mainSeries && getLast(mainSeries.options.data)[0];

            if (mainSeriesMax && max > mainSeriesMax) {
                xAxis.setExtremes(min, mainSeriesMax);
            }
        }
        return;
    }

    const lastY = Object.keys(lastData).length === 2 ? lastData.quote : lastData.close;
    const lastX = lastEpoch * 1000;

    // buffer is used for 2 reasons
    // 1. to show some space to the right
    // 2. by allocating buffer, future series does not have to update for every changes in start and end time
    // 40 secs is selected as it looks nice on chart, test on look and feel before changing it
    const bufferInSecs = 40;
    const startLaterMillis = startEpoch && ((startEpoch + bufferInSecs) * 1000);
    const exitLaterMillis = exitEpoch && ((exitEpoch + bufferInSecs) * 1000);

    // default value of interval and addition is related to @bufferInSecs
    // formula is  -   bufferInSecs * 1000 = interval * addition / 2
    // this will ensure the line we want to show will be in the middle on empty spaces
    function prependDataHelper(seriesData, lastValue, interval = 10000, addition = 8) {
        for (let i = addition; i >= 0; i--) {
            seriesData.push([lastValue - (i * interval), lastY]);
        }
        return seriesData;
    }

    if (oldSeries) {
        const oldSeriesMax = getLast(oldSeries.options.data)[0];
        const seriesData = [];

        if (startInFuture) {
            if (oldSeriesMax < startEpoch * 1000) {
                prependDataHelper(seriesData, startLaterMillis);
            }
        }

        if (endInFuture) {
            if (oldSeriesMax < exitEpoch * 1000) {
                prependDataHelper(seriesData, exitLaterMillis);
            }
        }

        if (seriesData.length > 0) {
            oldSeries.setData(seriesData);
            xAxis.setExtremes(min, getLast(seriesData)[0]);
        }
    } else {
        getMainSeries(chart).update({ dataGrouping: { enabled: false } });

        const seriesData = [];

        if (startInFuture) {
            prependDataHelper(seriesData, startLaterMillis);
        }

        if (endInFuture) {
            prependDataHelper(seriesData, exitLaterMillis);
        }

        if (seriesData.length > 0) {
            const futureSeries = createHiddenSeries(seriesData, 'future');
            chart.addSeries(futureSeries);
            xAxis.setExtremes(min, getLast(seriesData)[0]);
        }
    }
};
