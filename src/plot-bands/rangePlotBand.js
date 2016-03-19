import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import { relativeBarrier, relativeBarrier2 } from '../_utils';

export default (contract, lastSpot) => [
    lossPlotBand(0, relativeBarrier2(contract, lastSpot)),
    winPlotBand(relativeBarrier(contract, lastSpot), relativeBarrier2(contract, lastSpot)),
    lossPlotBand(relativeBarrier(contract, lastSpot), Number.MAX_VALUE),
];
