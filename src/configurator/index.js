import BaseConfigurator from './BaseConfigurator';
import plotBandsForContractAndTrade from './plotBandsForContractAndTrade';
import plotLinesForContract from './plotLinesForContract';

const baseConiguration = () =>
    new BaseConfigurator()
        .navigator()
        .rangeSelector()
        .yAxis()
        .spot()
        .xAxis()
        .events();

const enhanceConfigWithContractAndTrade = ({ config, lastTick, contract, trade}) => {
    config.yAxis.plotBands = plotBandsForContractAndTrade(contract || trade, lastTick);
    config.xAxis.plotLines = plotLinesForContract(contract);

    return config;
}

const lastTick = ticks => ticks.length && ticks[ticks.length - 1].quote;

export const fullConfig = ({ ticks, contract, trade }) => {
    const ticksConfig = baseConiguration().series(ticks).end();
    return enhanceConfigWithContractAndTrade({
        config: ticksConfig,
        lastTick: lastTick(ticks),
        contract,
        trade,
    });
}

const replacePlotBands = (axis, newPlotBands) => {
    newPlotBands.forEach(band => {
        axis.removePlotBand(band.id);
        axis.addPlotBand(band);
    });
}

const replacePlotLines = (axis, newPlotLines) => {
    newPlotLines.forEach(line => {
        axis.removePlotLine(line.id);
        axis.addPlotLine(line);
    });
}

export const updateChart = ({ chart, contract, trade }) => {
    const newPlotBands = plotBandsForContractAndTrade(contract || trade);
    replacePlotBands(chart.yAxis[0], newPlotBands)
    if (contract) {
        const newPlotLines = plotLinesForContract(contract);
        replacePlotLines(chart.xAxis[0], newPlotLines);
    }
}
