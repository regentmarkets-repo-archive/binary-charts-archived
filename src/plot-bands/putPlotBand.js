import callPutBarrier from 'binary-utils/lib/barrier/callPutBarrier';
import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default (contract, lastSpot) => [
    winPlotBand(0, callPutBarrier(contract, lastSpot)),
    lossPlotBand(callPutBarrier(contract, lastSpot), Number.MAX_VALUE),
];
