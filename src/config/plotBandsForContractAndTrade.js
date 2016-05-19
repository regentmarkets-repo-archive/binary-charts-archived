import * as confs from '../plot-bands/';

/**
 * All functions from plot-bands should adhere to this api
 * ({ barrier, low_barrier, high_barrier }) => plotbands
 * */

export const plotBandForContract = contract => {
    if (!contract) return [];
    const type = contract.contract_type;
    if (!type) return [];
    const configFunc = confs[type.toLowerCase() + 'PlotBand'];

    if (!configFunc) throw Error('Not a known type: ' + type);
    const { barrier, low_barrier, high_barrier } = contract;
    return configFunc({ barrier, low_barrier, high_barrier });
};

export const plotBandForTrade = (trade, lastTick) => {
    if (!trade) return [];
    const type = trade.contract_type;
    if (!type) return [];
    const configFunc = confs[type.toLowerCase() + 'PlotBand'];

    if (!configFunc) throw Error('Not a known type: ' + type);
    let { barrier, barrier2, barrierType } = trade;

    if (!barrier) {
        return configFunc({ barrier: lastTick });       // default barrier to last tick
    }

    if (barrierType === 'relative') {
        barrier = +(barrier) + lastTick;
        barrier2 = +(barrier2) + lastTick;
    }

    if (barrier && barrier2) {
        return configFunc({ low_barrier: barrier2, high_barrier: barrier });
    }

    return configFunc({ barrier });
};
