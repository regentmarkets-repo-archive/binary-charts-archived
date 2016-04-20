import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrier from 'binary-utils/lib/barrier/barrier';

export default (contract, lastSpot) => [
    winPlotBand(0, barrier(contract.barrier2, contract.barrierType, lastSpot, contract.entry_spot)),
    lossPlotBand(
        barrier(contract.barrier, contract.barrierType, lastSpot, contract.entry_spot),
        barrier(contract.barrier2, contract.barrierType, lastSpot, contract.entry_spot)),
    winPlotBand(barrier(contract.barrier, contract.barrierType, lastSpot, contract.entry_spot), Number.MAX_VALUE),
];
