import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import relativeBarrier from 'binary-utils/lib/barrier/relativeBarrier';
import relativeBarrier2 from 'binary-utils/lib/barrier/relativeBarrier2';

export default (contract, lastSpot) => [
    winPlotBand(0, relativeBarrier2(contract, lastSpot)),
    lossPlotBand(relativeBarrier(contract, lastSpot), relativeBarrier2(contract, lastSpot)),
    winPlotBand(relativeBarrier(contract, lastSpot), Number.MAX_VALUE),
];
