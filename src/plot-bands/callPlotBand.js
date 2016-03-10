import { winPlotBand, lossPlotBand } from './commonPlotBands';

export default (contract, lastSpot) => console.log(contract, lastSpot) || [
    lossPlotBand(0, lastSpot + contract.barrier),
    winPlotBand(lastSpot + contract.barrier, Number.MAX_VALUE),
];
