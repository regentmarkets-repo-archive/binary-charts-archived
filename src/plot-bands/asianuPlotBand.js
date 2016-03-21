import { winPlotBand, lossPlotBand } from './_commonPlotBands';

// TODO: calculate average of N ticks
export default (contract) => [
    lossPlotBand(0, contract.barrier),
    winPlotBand(contract.barrier, Number.MAX_VALUE),
];
