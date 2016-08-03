import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default ({ barrier, entry_tick }) =>
    barrier > entry_tick ?
        [
            lossPlotBand('loss1', 0, barrier),
            winPlotBand('win1', barrier, Number.MAX_VALUE),
        ] :
        [
            winPlotBand('win1', 0, barrier),
            lossPlotBand('loss1', barrier, Number.MAX_VALUE),
        ];
