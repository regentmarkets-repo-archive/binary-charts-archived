import { winPlotBand, lossPlotBand } from './commonPlotBands';

export default contract =>  [
    winPlotBand('win', 0, contract.barrier),
    lossPlotBand('loss', contract.barrier, contract.barrier2),
    winPlotBand('win2', contract.barrier2, Number.MAX_VALUE),
];
