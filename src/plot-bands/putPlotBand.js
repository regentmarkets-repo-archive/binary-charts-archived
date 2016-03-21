import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import { callPutBarrier } from '../_utils';

export default (contract, lastSpot) => [
    winPlotBand(0, callPutBarrier(contract, lastSpot)),
    lossPlotBand(callPutBarrier(contract, lastSpot), Number.MAX_VALUE),
];
