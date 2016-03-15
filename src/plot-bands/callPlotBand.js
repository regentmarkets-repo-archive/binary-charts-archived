import { winPlotBand, lossPlotBand } from './commonPlotBands';

export default (contract, lastSpot) => [
    lossPlotBand('loss', 0, lastSpot + contract.barrier),
    winPlotBand('win', lastSpot + contract.barrier, Number.MAX_VALUE),
];
