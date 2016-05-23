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
