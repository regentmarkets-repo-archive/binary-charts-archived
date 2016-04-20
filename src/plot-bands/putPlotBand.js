import barrier from 'binary-utils/lib/barrier/barrier';
import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default (contract, lastSpot) => [
    winPlotBand(0, barrier(contract.barrier, contract.barrierType, lastSpot, contract.entry_spot)),
    lossPlotBand(barrier(contract.barrier, contract.barrierType, lastSpot, contract.entry_spot), Number.MAX_VALUE),
];
