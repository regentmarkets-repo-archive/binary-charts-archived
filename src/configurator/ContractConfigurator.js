import * as confs from '../plot-bands/';
import dateEntryPlotLines from '../plot-lines/dateEntryPlotLines';

export const winPlotBand = (from, to) => ({
    from,
    to,
    color: 'rgba(0, 255, 0, 0.1)',
    label: {
        text: 'Win',
        style: {
            color: 'rgba(0, 255, 0, 1)'
        }
    }
});

export default (config, contract) => {
    if (contract) {
        const plotBandsConfigurator = confs[contract.contract_type.toLowerCase() + 'PlotBand'];
        if (plotBandsConfigurator) {
            config.yAxis.plotBands = plotBandsConfigurator(contract);
        }
        config.xAxis.plotLines = dateEntryPlotLines(contract);
    }
    return config;
}
