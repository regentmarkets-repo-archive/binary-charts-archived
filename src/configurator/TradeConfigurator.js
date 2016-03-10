import * as confs from '../plot-bands/';

export default ({ config, trade, lastTick }) => {
    if (trade) {
        const plotBandsConfigurator = confs[trade.type.toLowerCase() + 'PlotBand'];
        if (plotBandsConfigurator) {
            config.yAxis.plotBands = plotBandsConfigurator(trade, lastTick);
        }
    }
    return config;
}
