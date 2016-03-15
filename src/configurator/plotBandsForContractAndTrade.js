import * as confs from '../plot-bands/';

export default (contractOrTrade, lastTick) => {
    if (!contractOrTrade) return [];
    const type = contractOrTrade.type || contractOrTrade.contract_type;
    return confs[type.toLowerCase() + 'PlotBand'](contractOrTrade, lastTick);
}
