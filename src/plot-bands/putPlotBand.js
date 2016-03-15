import { winPlotBand, lossPlotBand } from './commonPlotBands';

export default contract => [
    winPlotBand('win', 0, contract.barrier),
    lossPlotBand('loss', contract.barrier, Number.MAX_VALUE),
];
