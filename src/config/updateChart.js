import shallowEqual from 'fbjs/lib/shallowEqual';
import { areTickArraysEqual } from '../_utils';
import updateTicks from './updateTicks';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';


const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const contractsAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.contract, prevProps.contract) &&
        shallowEqual(nextProps.trade, prevProps.trade);

const tradingTimesAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.tradingTimes, prevProps.tradingTimes);

export default (chart, prevProps, nextProps) => {
    if (!ticksAreEqual(prevProps, nextProps)) {
        updateTicks(chart.series[0], prevProps, nextProps);
    }

    if (!contractsAreEqual(prevProps, nextProps)) { // todo: if ticks differ too?
        const { contract, trade, ticks } = nextProps;
        updateContract({ chart, contract, trade, ticks });
    }

    if (!tradingTimesAreEqual(prevProps, nextProps)) { // todo: if ticks differ too?
        const { tradingTimes } = nextProps;
        updateTradingTimes({ chart, tradingTimes });
    }
};
