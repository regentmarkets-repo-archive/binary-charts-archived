import * as confs from '../plot-bands/';

export default (contractOrTrade, lastTick) => {
    if (!contractOrTrade) return [];
    const type = contractOrTrade.type || contractOrTrade.contract_type;
    const configFunc = confs[type.toLowerCase() + 'PlotBand'];
    if (!configFunc) throw Error('Not a known type: ' + type);
    return configFunc(contractOrTrade, lastTick);
}
