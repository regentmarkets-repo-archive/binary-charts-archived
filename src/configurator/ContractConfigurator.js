import * as confs from '../plot-bands/';

export default (config, contract) => {
    if (contract) {
        const plotBandsConfigurator = confs[contract.contract_type.toLowerCase() + 'PlotBand'];
        if (plotBandsConfigurator) {
            config.yAxis.plotBands = plotBandsConfigurator(contract);
        }
    }
    return config;
}
