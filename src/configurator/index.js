import BaseConfigurator from './BaseConfigurator';
import TradeConfigurator from './TradeConfigurator';
import ContractConfigurator from './ContractConfigurator';

export default (ticks, contract, trade) => {
    
    let configurator =
        new BaseConfigurator()
            .navigator()
            .rangeSelector()
            .yAxis()
            .spot()
            // .yAxisPlotLines()
            // .yAxisPlotBand()
            .xAxis()
            .series(ticks);

    if (contract) {
        switch (contract.contract_type) {
            case 'CALL': {
                configurator = configurator
                    .yAxisPlotBand(contract.barrier, Number.MAX_VALUE, 'Winning');
            }
            case 'PUT': {
                configurator = configurator
                    .yAxisPlotBand(0, contract.barrier, 'Winning');
            }
            case 'PUT': {
                configurator = configurator
                    .yAxisPlotBand(0, contract.barrier, 'Winning');
            }
            case 'RANGE': {
                configurator = configurator
                    .yAxisPlotBand(contract.barrier, contract.barrier2, 'Winning');
            }
            case 'UPORDOWN': {
                configurator = configurator
                    .yAxisPlotBand(0, contract.barrier, 'Winning')
                    .yAxisPlotBand(contract.barrier2, Number.MAX_VALUE, 'Winning');
            }
        }
    }

    if (trade) {
        //
    }

    return configurator.end();
}
