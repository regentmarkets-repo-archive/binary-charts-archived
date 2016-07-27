import shallowEqual from 'fbjs/lib/shallowEqual';
import { areTickArraysEqual, areOHLCArraysEqual,
    getLastTickQuote, getLastOHLCTick } from 'binary-utils';
import updateTicks from './updateTicks';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';
import updateRest from './updateRest';
import mergeTradeWithContract from './mergeTradeWithContract';

import updateTypeChange from './updateTypeChangeFunc';

const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    prevProps.type === nextProps.type &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const ohlcAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    prevProps.type === nextProps.type &&
    areOHLCArraysEqual(prevProps.ticks, nextProps.ticks);

const contractsAreEqual = (prevProps, nextProps) =>
    shallowEqual(prevProps.contract, nextProps.contract) &&
        shallowEqual(prevProps.trade, nextProps.trade);

const tradingTimesAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.tradingTimes, prevProps.tradingTimes);

const restAreEqual = (prevProps, nextProps) =>
    nextProps.pipSize === prevProps.pipSize;


export default (chart, prevProps, nextProps) => {
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);

    const { contract, pipSize, theme, trade, ticks, type } = nextProps;

    let lastTick = {};
    let ticksDiffer = true;
    switch (type) {
        case 'area': {
            lastTick = getLastTickQuote(ticks);
            ticksDiffer = !ticksAreEqual(prevProps, nextProps);
            break;
        }
        case 'candlestick': {
            lastTick = getLastOHLCTick(ticks);
            ticksDiffer = !ohlcAreEqual(prevProps, nextProps);
            break;
        }
        default: {
            throw new Error('Not recognized chart type: ', type);
        }
    }

    if (ticksDiffer) {
        updateTicks(chart, prevProps, nextProps);
        chart.redraw();
        if (ticks.length > 0) {
            chart.hideLoading();
        }
    }

    const mergedContract = mergeTradeWithContract({ trade, contract, lastTick });

    chart.userOptions.binary = {
        contract: mergedContract,
        ticks,
        pipSize,
        theme,
    };

    if (contractsDiffer || ticksDiffer) {
        updateContract({ chart, contract: mergedContract, theme });
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

    updateTypeChange(chart, prevProps.typeChange, nextProps.typeChange);

    chart.redraw();
};
