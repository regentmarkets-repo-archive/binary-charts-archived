import { winPlotBand, lossPlotBand } from './commonPlotBands';

// TODO: calculate average of N ticks
export default (contract) => [
    winPlotBand('win', 0, contract.barrier),
    lossPlotBand('loss', contract.barrier, Number.MAX_VALUE),
];
