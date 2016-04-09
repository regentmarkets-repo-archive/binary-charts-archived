import vertPlotLine from '../plot-lines/vertPlotLine';

export const strTimePlusDayAsEpoch = (day, time) =>
    2;

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
