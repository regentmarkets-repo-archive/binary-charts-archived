import BaseConfigurator from './BaseConfigurator';
import tradeConfig from './TradeConfigurator';
import contractConfig from './ContractConfigurator';

const baseConiguration = () =>
    new BaseConfigurator()
        .navigator()
        .rangeSelector()
        .yAxis()
        .spot()
        .xAxis();

export default ({ ticks, contract, trade }) => {
    const lastTick = ticks.length && ticks[ticks.length - 1].quote;
    const baseConfig = baseConiguration();
    const ticksConfig = baseConfig.series(ticks).end();
    const config2 = contractConfig(ticksConfig, contract);
    const config3 = tradeConfig({ config: config2, trade, lastTick });
    return config3;
}
