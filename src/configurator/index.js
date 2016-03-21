import BaseConfigurator from './BaseConfigurator';
import plotBandsForContractAndTrade from './plotBandsForContractAndTrade';
import plotLinesForContract from './plotLinesForContract';
import { getLastTick } from '../_utils';

const baseConiguration = () =>
    new BaseConfigurator()
        .navigator()
        .rangeSelector()
        .yAxis()
        .spot()
        .xAxis()
        .events();

const enhanceConfigWithContractAndTrade = ({ config, lastTick, contract, trade}) => {
    config.yAxis.plotBands = plotBandsForContractAndTrade(contract || trade, lastTick, lastTick);
    config.xAxis.plotLines = plotLinesForContract(contract);

    return config;
}

export const fullConfig = ({ ticks, contract, trade }) => {
    const ticksConfig = baseConiguration().series(ticks).end();
    return enhanceConfigWithContractAndTrade({
        config: ticksConfig,
        lastTick: getLastTick(ticks),
        contract,
        trade,
    });
}

const replacePlotBands = (axis, newPlotBands) => {
    axis.removePlotBand('barrier-band');
    newPlotBands.forEach(band => axis.addPlotBand(band));
}

const replacePlotLines = (axis, newPlotLines) => {
    newPlotLines.forEach(line => {
        axis.removePlotLine(line.id);
        axis.addPlotLine(line);
    });
}

const updateExtremes = (axis, ticks, contract) => {
    const tickMin = ticks[0] && ticks[0].epoch;
    const contractMin = contract && (+contract.entry_spot / 1000);
    const extremesMin = [tickMin, contractMin].filter(x => x);
    const min = Math.min(extremesMin);

    const tickMax = getLastTick(ticks).epoch;
    const contractMax = contract && (+contract.expiry_time / 1000);
    const extremesMax = [tickMax, contractMax].filter(x => x);
    const max = Math.max(extremesMax);

    axis.setExtremes(min, max);
}

export const updateChart = ({ chart, contract, trade, ticks }) => {
    const lastTick = getLastTick(ticks);
    const newPlotBands = plotBandsForContractAndTrade(contract || trade, lastTick);
    replacePlotBands(chart.yAxis[0], newPlotBands)
    if (contract) {
        const newPlotLines = plotLinesForContract(contract);
        replacePlotLines(chart.xAxis[0], newPlotLines);
    }
    // updateExtremes(chart.xAxis[0], ticks, contract || trade)
}
