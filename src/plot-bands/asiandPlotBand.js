import { winPlotBand, lossPlotBand } from './_commonPlotBands';

// TODO: calculate average of N ticks
export default (contract) => [
    winPlotBand(0, contract.barrier),
    lossPlotBand(contract.barrier, Number.MAX_VALUE),
];
