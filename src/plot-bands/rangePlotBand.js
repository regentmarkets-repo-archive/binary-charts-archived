import { winPlotBand, lossPlotBand } from './_commonPlotBands';
import barrierFromContract from 'binary-utils/lib/barrierFromContract';
import barrier2FromContract from 'binary-utils/lib/barrier2FromContract';

export default ({ low_barrier, high_barrier }) => [
    lossPlotBand('loss1', 0, low_barrier),
    winPlotBand(
        'win1',
        low_barrier,
        high_barrier
    ),
    lossPlotBand('loss2', high_barrier, Number.MAX_VALUE),
];
