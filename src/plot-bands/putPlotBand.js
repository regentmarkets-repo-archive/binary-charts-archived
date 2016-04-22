import barrierFromContract from 'binary-utils/lib/barrier/barrierFromContract';
import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default (contract, lastSpot) => [
    winPlotBand(0, barrierFromContract(contract, lastSpot)),
    lossPlotBand(barrierFromContract(contract, lastSpot), Number.MAX_VALUE),
];
