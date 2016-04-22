import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrierFromContract from 'binary-utils/lib/barrier/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier/barrier2FromContract';

export default (contract, lastSpot) => [
    lossPlotBand(0, barrier2FromContract(contract, lastSpot)),
    winPlotBand(
        barrierFromContract(contract, lastSpot),
        barrier2FromContract(contract, lastSpot)
    ),
    lossPlotBand(barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
