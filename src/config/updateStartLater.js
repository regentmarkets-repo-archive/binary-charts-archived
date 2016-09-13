import { getLast } from 'binary-utils';
import createHiddenSeries from './createHiddenSeries';
import getMainSeries from '../utils/getMainSeries';

export default (chart: Chart, startLaterEpoch: number, lastTick: number) => {
    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();

    const oldSeries = chart.get('future');

    if (startLaterEpoch && lastTick) {
        if (oldSeries) {
            const oldStartLater = Math.round(oldSeries.options.data[0][0] / 1000);
            if (oldStartLater !== startLaterEpoch) {
                oldSeries.setData([startLaterEpoch * 1000, lastTick]);
                xAxis.setExtremes(min, startLaterEpoch * 1000);
            }
        } else {
            const startLaterDate = startLaterEpoch * 1000;
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
