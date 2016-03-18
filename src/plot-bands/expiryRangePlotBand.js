import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default contract =>  [
    lossPlotBand('loss', 0, contract.barrier),
    winPlotBand('win', contract.barrier, contract.barrier2),
    lossPlotBand('loss2', contract.barrier2, Number.MAX_VALUE),
];
