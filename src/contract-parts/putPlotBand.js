import { winPlotBand, lossPlotBand } from './bands';

export default contract => [
    winPlotBand(0, contract.barrier),
    lossPlotBand(contract.barrier, Number.MAX_VALUE),
];
