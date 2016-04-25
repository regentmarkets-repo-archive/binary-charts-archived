import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier2FromContract';

export default (contract, lastSpot) => [
    winPlotBand(0, barrier2FromContract(contract, lastSpot)),
    lossPlotBand(
        barrierFromContract(contract, lastSpot),
        barrier2FromContract(contract, lastSpot)),
    winPlotBand(barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
