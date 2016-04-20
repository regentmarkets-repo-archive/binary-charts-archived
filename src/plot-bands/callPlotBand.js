import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrier from 'binary-utils/lib/barrier/barrier';

export default (contract, lastSpot) => [
    lossPlotBand(0, barrier(contract.barrier, contract.barrierType, lastSpot, contract.entry_spot)),
    winPlotBand(barrier(contract.barrier, contract.barrierType, lastSpot, contract.entry_spot), Number.MAX_VALUE),
];
