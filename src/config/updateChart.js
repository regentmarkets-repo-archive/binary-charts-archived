import shallowEqual from 'fbjs/lib/shallowEqual';
import { areTickArraysEqual } from '../_utils';
import updateTicks from './updateTicks';
import updateContract from './updateContract';

const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const paramsAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.contract, prevProps.contract) &&
        shallowEqual(nextProps.trade, prevProps.trade) &&
        shallowEqual(nextProps.tradingTime, prevProps.tradingTime);

export default (chart, prevProps, nextProps) => {
    if (!ticksAreEqual(prevProps, nextProps)) {
        updateTicks(chart.series[0], prevProps, nextProps);
    }

    if (!paramsAreEqual(prevProps, nextProps)) { // todo: if ticks differ too?
        const { contract, trade, ticks } = nextProps;
        updateContract({ chart, contract, trade, ticks });
    }
};
