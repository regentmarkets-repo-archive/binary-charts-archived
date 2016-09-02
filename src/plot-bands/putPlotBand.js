import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default ({ barrier }: PlotBandParam): PlotBand[] => [
    winPlotBand('win1', 0, barrier),
    lossPlotBand('loss1', barrier, Number.MAX_VALUE),
];
