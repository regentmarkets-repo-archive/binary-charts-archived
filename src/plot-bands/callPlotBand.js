import { winPlotBand, lossPlotBand } from './commonPlotBands';

export default contract => [
    lossPlotBand(0, contract.barrier),
    winPlotBand(contract.barrier, Number.MAX_VALUE),
];
