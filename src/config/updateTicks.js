import { doTicksDifferJustOneEntry, tickToData, getLastTick } from '../_utils';

export default (series, prevProps, nextProps) => {
    const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);

    if (oneTickDiff) {
        const lastTick = getLastTick(nextProps.ticks);
        series.addPoint(tickToData(lastTick));
    } else {
        series.setData(nextProps.ticks.map(tickToData));
    }
};
