import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import callPutBarrier from 'binary-utils/lib/barrier/callPutBarrier';

export default (contract, lastSpot) => [
    lossPlotBand(0, callPutBarrier(contract, lastSpot)),
    winPlotBand(callPutBarrier(contract, lastSpot), Number.MAX_VALUE),
];
