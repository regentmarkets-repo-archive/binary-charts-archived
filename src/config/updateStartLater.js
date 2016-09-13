import { getLast } from 'binary-utils';
import seriesLine from './seriesLine';
import getMainSeries from '../utils/getMainSeries';

const createFutureSeries = (futureEpoch: number, lastTick: number) => {
    const futureDataPoint = [futureEpoch * 1000, lastTick];
    return seriesLine([futureDataPoint], 0, 'line', 'future', true)[0];
};

const futureSeriesId = 'future';

export default (chart: Chart, startLaterEpoch: number, lastTick: number) => {
    const xAxis = chart.xAxis[0];
    const { min, max } = xAxis.getExtremes();

    const oldSeries = chart.get(futureSeriesId);

    if (startLaterEpoch && lastTick) {
        if (oldSeries) {
            const oldStartLater = Math.round(oldSeries.options.data[0][0] / 1000);
            if (oldStartLater !== startLaterEpoch) {
                oldSeries.setData([startLaterEpoch * 1000, lastTick]);
                xAxis.setExtremes(min, startLaterEpoch * 1000);
            }
        } else {
            const newSeries = createFutureSeries(startLaterEpoch, lastTick);
            chart.addSeries(newSeries);
            xAxis.setExtremes(min, startLaterEpoch * 1000);
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
