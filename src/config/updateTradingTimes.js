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


// flatten trading times into array of { name, epoch }
// where name is open/close/settlement
export const flattenTradingTimes = (day: Date, times: TradingTimes) => {
    if (!times) return [];

    const open = times.open.map(x => ({ name: 'open', epoch: strTimePlusDayAsEpoch(new Date, x) }));
    const close = times.close.map(x => ({ name: 'close', epoch: strTimePlusDayAsEpoch(new Date, x) }));
    const settlement = times.settlement;

    const result = open.concat(close);
    result.push({ name: 'settlement', epoch: strTimePlusDayAsEpoch(new Date, settlement) });
    return result;
};

const plotLinesBandsForTradingTimes = (tradingTimes: TradingTimes) =>
    flattenTradingTimes(new Date(), tradingTimes).map(x =>
        vertPlotLine('trading-times-line', x.epoch, x.name, 'left', 'light')
    );

export default (chart: Chart, tradingTimes: TradingTimes) => {
    const axis = chart.xAxis[0];
    axis.removePlotLine('trading-times-line');
    const newPlotLines = plotLinesBandsForTradingTimes(tradingTimes);
    newPlotLines.forEach(x => axis.addPlotLine(x));
};
