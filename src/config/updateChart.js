import shallowEqual from 'fbjs/lib/shallowEqual';
import areTickArraysEqual from 'binary-utils/lib/areTickArraysEqual';
import updateTicks from './updateTicks';
import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import getLastOHLCTick from 'binary-utils/lib/getLastOHLCTick';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';
import updateRest from './updateRest';
import mergeTradeWithContract from './mergeTradeWithContract';

const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    prevProps.type === nextProps.type &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const contractsAreEqual = (prevProps, nextProps) =>
    shallowEqual(prevProps.contract, nextProps.contract) &&
        shallowEqual(prevProps.trade, nextProps.trade);

const tradingTimesAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.tradingTimes, prevProps.tradingTimes);

const restAreEqual = (prevProps, nextProps) =>
    nextProps.pipSize === prevProps.pipSize;


export default (chart, prevProps, nextProps) => {
    const ticksDiffer = !ticksAreEqual(prevProps, nextProps);
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);

    const { contract, trade, ticks, type } = nextProps;

    const lastTick = type === 'area' ? getLastTickQuote(ticks) : getLastOHLCTick(ticks);

    const mergedContract = mergeTradeWithContract({ trade, contract, lastTick });
    if (contractsDiffer || ticksDiffer) {
        updateContract({ chart, contract: mergedContract, ticks });
    }

    if (ticksDiffer) {
        updateTicks(chart, prevProps, nextProps);
        if (ticks.length > 0) {
            chart.hideLoading();
        }
    }

    const tradingTimesDiffer = !tradingTimesAreEqual(prevProps, nextProps);
    if (tradingTimesDiffer) {
        const { tradingTimes } = nextProps;
        updateTradingTimes({ chart, tradingTimes });
    }

    const restDiffer = !restAreEqual(prevProps, nextProps);
    if (restDiffer) {
        updateRest(chart, nextProps);
    }

    chart.redraw();
};
