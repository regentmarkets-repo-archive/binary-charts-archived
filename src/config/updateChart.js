import shallowEqual from 'fbjs/lib/shallowEqual';
import areTickArraysEqual from 'binary-utils/lib/areTickArraysEqual';
import updateTicks from './updateTicks';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';

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

export default (chart, prevProps, nextProps) => {
    const ticksDiffer = !ticksAreEqual(prevProps, nextProps);
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);
    const tradingTimesDiffer = !tradingTimesAreEqual(prevProps, nextProps);
    const chartTypeDiffer = !chartTypesAreEqual(prevProps, nextProps);

    if (chartTypeDiffer) {
        chart.series[0].update({ type: nextProps.type });
    }

    if (ticksDiffer) {
        updateTicks(chart, prevProps, nextProps);
    }

    if (contractsDiffer || ticksDiffer) {
        const { contract, trade, ticks } = nextProps;
        updateContract({
            chart,
            contract: contract || trade,
            ticks,
            contractDidNotChange: !contractsDiffer,
        });
    }

    if (tradingTimesDiffer) {
        const { tradingTimes } = nextProps;
        updateTradingTimes({ chart, tradingTimes });
    }
};
