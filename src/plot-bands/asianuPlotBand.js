import { winPlotBand, lossPlotBand } from './_commonPlotBands';

// TODO: calculate average of N ticks
export default (contract) => [
    lossPlotBand('loss1', 0, contract.barrier),
    winPlotBand('win1', contract.barrier, Number.MAX_VALUE),
];
