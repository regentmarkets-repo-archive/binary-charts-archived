// $FlowFixMe
import shallowEqual from 'fbjs/lib/shallowEqual';
import { areTickArraysEqual, areCandleArrayEqual,
    getLastTickQuote, getLastOHLCTick, getLast } from 'binary-utils';
import updateSeries from './updateSeries';
import updateContract from './updateContract';
import updateStartLater from './updateStartLater';
import updateTradingTimes from './updateTradingTimes';
import updateRest from './updateRest';
import updateMinRange from './updateMinRange';
import updateIndicators from './updateIndicators';
import updateSeriesName from './updateSeriesName';
// $FlowFixMe
import mergeTradeWithContract from './mergeTradeWithContract';

const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    prevProps.type === nextProps.type &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const ohlcAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    prevProps.type === nextProps.type &&
    areCandleArrayEqual(prevProps.ticks, nextProps.ticks);

const contractsAreEqual = (prevProps, nextProps) =>
    shallowEqual(prevProps.contract, nextProps.contract) &&
        shallowEqual(prevProps.trade, nextProps.trade);

const tradingTimesAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.tradingTimes, prevProps.tradingTimes);

const restAreEqual = (prevProps, nextProps) =>
    nextProps.pipSize === prevProps.pipSize;

const indicatorConfigEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.indicators, prevProps.indicators);

const assetNameEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.assetName, prevProps.assetName);

export default (chart: Chart, prevProps: Object, nextProps: Object) => {
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);

    const { contract, pipSize, theme, trade, ticks, type, shiftMode } = nextProps;

    let lastTick = {};
    let ticksDiffer = true;
    switch (type) {
        case 'line':
        case 'area': {
            lastTick = getLastTickQuote(ticks);
            ticksDiffer = !ticksAreEqual(prevProps, nextProps);
            break;
        }
        case 'ohlc':
        case 'candlestick': {
            lastTick = getLastOHLCTick(ticks);
            ticksDiffer = !ohlcAreEqual(prevProps, nextProps);
            break;
        }
        default: {
            throw new Error('Not recognized chart type: ', type);
        }
    }

    const mergedContract = mergeTradeWithContract(trade, contract, lastTick);

    // order of execution matters!
    // other update func could potentially depends on chart.userOptions.binary
    chart.userOptions.binary = Object.assign(chart.userOptions.binary, {
        contract: mergedContract,
        ticks,
        pipSize,
        theme,
        shiftMode: shiftMode || chart.userOptions.binary.shiftMode,            // use old shiftMode if no new shiftMode
        type,
    });

    if (ticksDiffer) {
        updateSeries(chart, nextProps);
        if (ticks.length > 0) {
            chart.hideLoading();
        }
    }

    let futureUpdated = false;
    if (mergedContract) {
        futureUpdated = updateStartLater(chart, mergedContract, getLast(ticks));
    }

    if (contractsDiffer || ticksDiffer) {
        updateContract(chart, mergedContract, theme);
    }

    const tradingTimesDiffer = !tradingTimesAreEqual(prevProps, nextProps);
    if (tradingTimesDiffer) {
        const { tradingTimes } = nextProps;
        updateTradingTimes(chart, tradingTimes);
    }

    const pipSizeDiffer = !restAreEqual(prevProps, nextProps);
    if (pipSizeDiffer) {
        updateRest(chart, nextProps);
    }

    const minRangeUpdated = updateMinRange(chart);

    const indicatorsDiffer = !indicatorConfigEqual(prevProps, nextProps);
    if (indicatorsDiffer || ticksDiffer) {
        const indicatorsConfWithPipSize = nextProps.indicators.map(conf => Object.assign({ pipSize }, conf));
        updateIndicators(chart, ticks, indicatorsConfWithPipSize);
    }

    const assetNameDiffer = !assetNameEqual(prevProps, nextProps);
    if (assetNameDiffer) {
        updateSeriesName(chart, nextProps.assetName);
    }

    if (ticksDiffer || contractsDiffer || tradingTimesDiffer
        || pipSizeDiffer || futureUpdated || minRangeUpdated || indicatorsDiffer) {
        chart.redraw(false);
    }
};
