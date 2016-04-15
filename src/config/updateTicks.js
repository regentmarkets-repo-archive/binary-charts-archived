import doTicksDifferJustOneEntry from 'binary-utils/lib/ticks/doTicksDifferJustOneEntry';
import tickToData from 'binary-utils/lib/ticks/tickToData';
import getLastTick from 'binary-utils/lib/ticks/getLastTick';

export default (chart, prevProps, nextProps) => {
    const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);

    if (oneTickDiff) {
        const lastTick = getLastTick(nextProps.ticks);
        chart.series[0].addPoint(tickToData(lastTick));
    } else {
        chart.series[0].setData(nextProps.ticks.map(tickToData));
        chart.redraw();
    }
};
