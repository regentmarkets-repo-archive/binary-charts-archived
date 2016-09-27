import { getLast } from 'binary-utils';
import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';

export default (chart: Chart, contract: Object, lastData: Object) => {
    const startEpoch = contract.date_start;
    const exitEpoch = contract.date_expiry;

    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();

    if (!lastData || !min || !max) return;

    const startInFuture = startEpoch && startEpoch > lastData.epoch;
    const endInFuture = exitEpoch && exitEpoch > lastData.epoch;

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

    const lastTick = Object.keys(lastData).length === 2 ? lastData.quote : lastData.close;

    // 100 secs buffer is used for 2 reasons
    // 1. to show some space to the right
    // 2. by allocating buffer, future series does not have to update for every changes in start and end time
    const startLaterMillis = startEpoch && ((startEpoch + 100) * 1000);
    const exitLaterMillis = exitEpoch && ((exitEpoch + 100) * 1000);

    if (oldSeries) {
        const oldSeriesMax = oldSeries.options.data[1][0];
        const seriesData = [];

        if (startInFuture) {
            if (oldSeriesMax < startEpoch * 1000) {
                seriesData.push([startLaterMillis, lastTick]);
            }
        }

        if (endInFuture) {
            if (oldSeriesMax < exitEpoch * 1000) {
                seriesData.push([exitLaterMillis, lastTick]);
            }
        }

        switch (seriesData.length) {
            case 1:
                seriesData.push(seriesData[0]);
                oldSeries.setData(seriesData);
                xAxis.setExtremes(min, seriesData[1][0]);
                break;
            case 2:
                oldSeries.setData(seriesData);
                xAxis.setExtremes(min, seriesData[1][0]);
                break;
            default:
                // do nothing
        }
    } else {
        getMainSeries(chart).update({ dataGrouping: { enabled: false } });

        const seriesData = [];

        if (startInFuture) {
            seriesData.push([startLaterMillis, lastTick]);
        }

        if (endInFuture) {
            seriesData.push([exitLaterMillis, lastTick]);
        }

        if (seriesData.length === 1) {
            seriesData.push(seriesData[0]);
        }

        const futureSeries = createHiddenSeries(seriesData, 'future');
        chart.addSeries(futureSeries);
        xAxis.setExtremes(min, seriesData[1][0]);
    }
};
