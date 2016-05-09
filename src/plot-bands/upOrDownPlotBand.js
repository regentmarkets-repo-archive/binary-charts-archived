import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier2FromContract';

export default (contract, lastSpot) => [
    winPlotBand('win1', 0, barrier2FromContract(contract, lastSpot)),
    lossPlotBand(
        'loss1',
        barrierFromContract(contract, lastSpot),
        barrier2FromContract(contract, lastSpot)),
    winPlotBand('win2', barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
