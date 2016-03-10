import callPlotBand from '../contract-parts/callPlotBand';
import putPlotBand from '../contract-parts/putPlotBand';
import rangePlotBand from '../contract-parts/rangePlotBand';
import upordownPlotBand from '../contract-parts/upordownPlotBand';

import * as confs from '../contract-parts/';

export default (config, contract) => {
    if (contract) {
        const configurator = confs[contract.contract_type.toLowerCase() + 'PlotBand'];
        if (configurator) {
            config.yAxis.plotBands = configurator(contract);
        }
    }
    return config;
}
