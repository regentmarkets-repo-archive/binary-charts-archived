import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import { callPutBarrier } from '../_utils';

export default (contract, lastSpot) => [
    lossPlotBand('loss', 0, callPutBarrier(contract, lastSpot)),
    winPlotBand('win', callPutBarrier(contract, lastSpot), Number.MAX_VALUE),
];
