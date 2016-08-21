import { winPlotBand, lossPlotBand } from './_commonPlotBands';

export default ({ barrier: number, entry_tick: number }): PlotBand[] =>
    barrier < entry_tick ?                      // eslint-disable-line camelcase
        [
            lossPlotBand('loss1', 0, barrier),
            winPlotBand('win1', barrier, Number.MAX_VALUE),
        ] :
        [
            winPlotBand('win1', 0, barrier),
            lossPlotBand('loss1', barrier, Number.MAX_VALUE),
        ];
