import { dateToEpoch } from 'binary-utils';
import vertPlotLine from '../plot-lines/vertPlotLine';

const strToSeconds = timeStr => {
    const parts = timeStr.split(':');
    return +parts[0] * 60 * 60 + +parts[1] * 60 + +parts[2];
};

/**
 * @param day   [Date]
 * @param time  [String] -- "hh:mm:ss"
 */
export const strTimePlusDayAsEpoch = (day: Date, time: string) =>
    dateToEpoch(day) + strToSeconds(time);

export const tradingTimesToEpochs = (day: Date, times: TradingTimes) => !times ? [] : [
    ...times.open,
    ...times.close,
    times.settlement,
].map(x => strTimePlusDayAsEpoch(day, x));

const plotLinesBandsForTradingTimes = (tradingTimes: TradingTimes) =>
    tradingTimesToEpochs(new Date(), tradingTimes).map(x =>
        vertPlotLine('trading-times-line', x, 'TT', 'left', 'light')
    );

export default (chart: Chart, tradingTimes: TradingTimes) => {
    const axis = chart.xAxis[0];
    axis.removePlotLine('trading-times-line');
    const newPlotLines = plotLinesBandsForTradingTimes(tradingTimes);
    newPlotLines.forEach(x => axis.addPlotLine(x));
};
