import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier2FromContract';

export default (contract, lastSpot) => [
    lossPlotBand('loss1', 0, barrier2FromContract(contract, lastSpot)),
    winPlotBand(
        'win1',
        barrierFromContract(contract, lastSpot),
        barrier2FromContract(contract, lastSpot)
    ),
    lossPlotBand('loss2', barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
