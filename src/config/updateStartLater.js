import { getLast, nowAsEpoch } from 'binary-utils';
import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';

export default (chart: Chart, startLaterEpoch: number, lastTick: number) => {
    if (startLaterEpoch <= nowAsEpoch()) {
        return;
    }

    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();

    if (!min || !max) return;               // if chart is not drawn yet, abort

    const oldSeries = chart.get('future');
    const startLaterDate = (startLaterEpoch + 5) * 1000; // 5 secs space to the right

    if (startLaterEpoch && lastTick) {
        if (oldSeries) {
            const oldStartLater = Math.round(oldSeries.options.data[0][0] / 1000);
            if (oldStartLater !== startLaterEpoch) {
                oldSeries.setData([startLaterDate, lastTick]);
                xAxis.setExtremes(min, startLaterDate);
            }
        } else {
            chart.addSeries(createHiddenSeries([[startLaterDate, lastTick]], 'future'));
            xAxis.setExtremes(min, startLaterDate);
        }
    }

    if (!startLaterEpoch) {
        if (oldSeries) {
            oldSeries.remove();
            const mainSeries = getMainSeries(chart);
            const mainSeriesMax = mainSeries && getLast(mainSeries.options.data)[0];

            if (mainSeriesMax && max > mainSeriesMax) {
                xAxis.setExtremes(min, mainSeriesMax);
            }
        }
    }
};
