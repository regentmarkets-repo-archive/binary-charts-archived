import shallowEqual from 'fbjs/lib/shallowEqual';
import areTickArraysEqual from 'binary-utils/lib/areTickArraysEqual';
import areOHLCArraysEqual from 'binary-utils/lib/areCandleArrayEqual';
import updateTicks from './updateTicks';
import getLastTickQuote from 'binary-utils/lib/getLastTickQuote';
import getLastOHLCTick from 'binary-utils/lib/getLastOHLCTick';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';
import updateTheme from './updateTheme';
import updateRest from './updateRest';
import mergeTradeWithContract from './mergeTradeWithContract';

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

const themesAreEqual = (prevProps, nextProps) =>
    nextProps.theme === prevProps.theme;

const restAreEqual = (prevProps, nextProps) =>
    nextProps.pipSize === prevProps.pipSize;


export default (chart, prevProps, nextProps) => {
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);

    const { contract, trade, ticks, type, pipSize } = nextProps;

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

    chart.binary.contract = mergedContract;
    chart.binary.ticks = ticks;
    chart.binary.pipSize = pipSize;

    if (contractsDiffer || ticksDiffer) {
        updateContract({ chart, contract: mergedContract, ticks });
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

    if (!themesAreEqual(prevProps, nextProps)) {
        updateTheme(nextProps.theme);
    }

    chart.redraw();
};
