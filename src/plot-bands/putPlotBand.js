import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default (contract, lastSpot) => [
    winPlotBand('win1', 0, barrierFromContract(contract, lastSpot)),
    lossPlotBand('loss1', barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
