import { winPlotBand } from './_commonPlotBands';

// TODO: calculate average of N ticks
export default ({ barrier }: PlotBandParam): PlotBand[] => [
//    lossPlotBand('loss1', 0, barrier),
    winPlotBand('win1', barrier, Number.MAX_VALUE),
];
