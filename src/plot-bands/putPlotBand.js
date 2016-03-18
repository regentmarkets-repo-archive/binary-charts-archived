import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import { callPutBarrier } from '../_utils';

export default (contract, lastSpot) => [
    winPlotBand('win', 0, callPutBarrier(contract, lastSpot)),
    lossPlotBand('loss', callPutBarrier(contract, lastSpot), Number.MAX_VALUE),
];
