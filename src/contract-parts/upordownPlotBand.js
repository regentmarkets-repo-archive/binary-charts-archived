import { winPlotBand, lossPlotBand } from './bands';

export default contract =>  [
    winPlotBand(0, contract.barrier),
    lossPlotBand(contract.barrier, contract.barrier2),
    winPlotBand(contract.barrier2, Number.MAX_VALUE),
];
