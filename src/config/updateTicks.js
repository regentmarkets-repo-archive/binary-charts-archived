import doTicksDifferJustOneEntry from 'binary-utils/lib/ticks/doTicksDifferJustOneEntry';
import tickToData from 'binary-utils/lib/ticks/tickToData';
import getLastTick from 'binary-utils/lib/ticks/getLastTick';

export default (series, prevProps, nextProps) => {
    const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);

    if (oneTickDiff) {
        const lastTick = getLastTick(nextProps.ticks);
        series.addPoint(tickToData(lastTick));
    } else {
        series.setData(nextProps.ticks.map(tickToData));
    }
};
