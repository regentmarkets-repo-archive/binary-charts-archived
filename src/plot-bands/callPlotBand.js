import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default ({ barrier: number }): PlotBand[] => [
    lossPlotBand('loss1', 0, barrier),
    winPlotBand('win1', barrier, Number.MAX_VALUE),
];
