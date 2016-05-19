import { winPlotBand, lossPlotBand } from './_commonPlotBands';

// TODO: calculate average of N ticks
export default ({ barrier }) => [
    winPlotBand('win1', 0, barrier),
    lossPlotBand('loss1', barrier, Number.MAX_VALUE),
];
