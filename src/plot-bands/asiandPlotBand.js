import { winPlotBand, lossPlotBand } from './_commonPlotBands';

// TODO: calculate average of N ticks
export default (contract) => [
    winPlotBand('win1', 0, contract.barrier),
    lossPlotBand('loss1', contract.barrier, Number.MAX_VALUE),
];
