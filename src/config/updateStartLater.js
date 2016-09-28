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
                const interval = (startLaterMillis - lastX) / 8;
                for (let i = 0; i < 8; i ++) {
                    seriesData.push([lastX + i * interval, lastY]);
                }
                seriesData.push([startLaterMillis, lastY]);
            }
        }

        if (endInFuture) {
            if (oldSeriesMax < exitEpoch * 1000) {
                const startPoint =
                    seriesData.length === 0 ? lastX : getLast(seriesData)[0];
                const interval = (exitLaterMillis - startPoint) / 8;

                for (let i = 0; i < 8; i ++) {
                    seriesData.push([startPoint + i * interval, lastY]);
                }
                seriesData.push([exitLaterMillis, lastY]);
            }
        }

        oldSeries.setData(seriesData);
        xAxis.setExtremes(min, getLast(seriesData)[0]);
    } else {
        getMainSeries(chart).update({ dataGrouping: { enabled: false } });

        const seriesData = [];

        if (startInFuture) {
            const interval = (startLaterMillis - lastX) / 8;
            for (let i = 0; i < 8; i ++) {
                seriesData.push([lastX + i * interval, lastY]);
            }
            seriesData.push([startLaterMillis, lastY]);
        }

        if (endInFuture) {
            const startPoint =
                seriesData.length === 0 ? lastX : getLast(seriesData)[0];
            const interval = (exitLaterMillis - startPoint) / 8;

            for (let i = 0; i < 8; i ++) {
                seriesData.push([startPoint + i * interval, lastY]);
            }
            seriesData.push([exitLaterMillis, lastY]);
        }

        const futureSeries = createHiddenSeries(seriesData, 'future');
        chart.addSeries(futureSeries);
        xAxis.setExtremes(min, getLast(seriesData)[0]);
    }
};
