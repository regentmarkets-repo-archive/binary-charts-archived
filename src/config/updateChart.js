import shallowEqual from 'fbjs/lib/shallowEqual';
import areTickArraysEqual from 'binary-utils/lib/areTickArraysEqual';
import updateTicks from './updateTicks';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';
import updateRest from './updateRest';
import updateRangeChangeFunc from './updateRangeChangeFunc';
import updateTypeChangeFunc from './updateTypeChangeFunc';

const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const contractsAreEqual = (prevProps, nextProps) =>
    shallowEqual(prevProps.contract, nextProps.contract) &&
        shallowEqual(prevProps.trade, nextProps.trade);

const tradingTimesAreEqual = (prevProps, nextProps) =>
    shallowEqual(nextProps.tradingTimes, prevProps.tradingTimes);

const chartTypesAreEqual = (prevProps, nextProps) =>
    prevProps.type === nextProps.type;

const restAreEqual = (prevProps, nextProps) =>
    nextProps.pipSize === prevProps.pipSize;


export default (chart, prevProps, nextProps) => {
    const ticksDiffer = !ticksAreEqual(prevProps, nextProps);
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);
    const chartTypeDiffer = !chartTypesAreEqual(prevProps, nextProps);

    if (chartTypeDiffer) {
        const type = nextProps.type === 'candles' ? 'candlestick' : 'area';
        chart.series[0].update({ type });
    }

    if (ticksDiffer) {
        updateTicks(chart, prevProps, nextProps);
    }

    if (contractsDiffer || ticksDiffer) {
        const { contract, trade, ticks } = nextProps;
        updateContract({
            chart,
            contract,
            trade,
            ticks,
            contractDidNotChange: !contractsDiffer,
        });
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

    updateRangeChangeFunc(chart, prevProps.rangeChange, nextProps.rangeChange);
    updateTypeChangeFunc(chart, prevProps.typeChange, nextProps.typeChange);
};
