import shallowEqual from 'fbjs/lib/shallowEqual';
import { areTickArraysEqual, doTicksDifferJustOneEntry, tickToData } from './_utils';
import { getLastTick } from './_utils';

const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const updateTicks = (series, prevProps, nextProps) => {
    const oneTickDiff = doTicksDifferJustOneEntry(prevProps.ticks, nextProps.ticks);

    if (oneTickDiff) {
        const lastTick = getLastTick(nextProps.ticks);
        series.addPoint(tickToData(lastTick));
    } else {
        series.setData(nextProps.ticks.map(tickToData));
    }
};

const paramsAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.contract, prevProps.contract) &&
        shallowEqual(nextProps.trade, prevProps.trade);

export const updateChart = (chart, prevProps, nextProps) => {
    if (!ticksAreEqual(prevProps, nextProps)) {
        updateTicks(chart.series[0], prevProps, nextProps);
    }

    if (!paramsAreEqual(prevProps, nextProps)) { // todo: if ticks differ too
        const { contract, trade, ticks } = nextProps;
        updateChart({ chart, contract, trade, ticks });
    }
};
