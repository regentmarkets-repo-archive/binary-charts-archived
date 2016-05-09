import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';

export default (contract, lastSpot) => [
    lossPlotBand('loss1', 0, barrierFromContract(contract, lastSpot)),
    winPlotBand('win1', barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
