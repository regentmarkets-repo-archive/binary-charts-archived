import { dateToEpoch } from 'binary-utils/lib/DateUtils';
import vertPlotLine from '../plot-lines/vertPlotLine';

const strToSeconds = timeStr => {
    const parts = timeStr.split(':');
    return +parts[0] * 60 * 60 + +parts[1] * 60 + +parts[2];
};

/**
 * @param day   [Date]
 * @param time  [String] -- "hh:mm:ss"
 */
export const strTimePlusDayAsEpoch = (day, time) =>
    dateToEpoch(day) + strToSeconds(time);

export const tradingTimesToEpochs = (day, times) => !times ? [] : [
    ...times.open,
    ...times.close,
    times.settlement,
].map(x => strTimePlusDayAsEpoch(day, x));

const plotLinesBandsForTradingTimes = tradingTimes =>
    tradingTimesToEpochs(new Date(), tradingTimes).map(x =>
        vertPlotLine('trading-times-line', x, 'red', 'TT', 'left')
    );

export default ({ chart, tradingTimes }) => {
    const axis = chart.xAxis[0];
    axis.removePlotLine('trading-times-line');
    const newPlotLines = plotLinesBandsForTradingTimes(tradingTimes);
    newPlotLines.forEach(x => axis.addPlotLine(x));
};
