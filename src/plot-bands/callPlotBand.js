import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrierFromContract from 'binary-utils/lib/barrier/barrierFromContract';

export default (contract, lastSpot) => [
    lossPlotBand(0, barrierFromContract(contract, lastSpot)),
    winPlotBand(barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
