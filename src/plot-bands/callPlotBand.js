import { winPlotBand, lossPlotBand } from './commonPlotBands';

export default (contract, lastSpot) => [
    lossPlotBand('loss', 0, contract.barrier || +contract.entry_spot),
    winPlotBand('win', contract.barrier || +contract.entry_spot, Number.MAX_VALUE),
];
