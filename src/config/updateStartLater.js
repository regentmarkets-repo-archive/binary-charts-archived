import { getLast } from 'binary-utils';
import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';

export default (chart: Chart, startLaterEpoch: number, lastData: Object) => {
    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();

    if (!lastData || !min || !max) return;

    const oldSeries = chart.get('future');

    if (!startLaterEpoch) {
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
    if (startLaterEpoch <= lastData.epoch) {
        return;
    }

    const startLaterDate = (startLaterEpoch + 5) * 1000; // 5 secs space to the right

    if (startLaterEpoch && lastTick) {
        if (oldSeries) {
            const oldStartLater = Math.round(oldSeries.options.data[0][0] / 1000);
            if (oldStartLater !== startLaterEpoch) {
                oldSeries.setData([[startLaterEpoch * 1000, lastTick], [startLaterDate, lastTick]]);
                xAxis.setExtremes(min, startLaterDate);
            }
        } else {
            getMainSeries(chart).update({ dataGrouping: { enabled: false } });
            const futureSeries = createHiddenSeries([[startLaterEpoch * 1000, lastTick], [startLaterDate, lastTick]], 'future');
            chart.addSeries(futureSeries);
            xAxis.setExtremes(min, startLaterDate);
        }
    }
};
