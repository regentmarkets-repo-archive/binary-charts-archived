import shallowEqual from 'fbjs/lib/shallowEqual';
import areTickArraysEqual from 'binary-utils/lib/ticks/areTickArraysEqual';
import getLastTick from 'binary-utils/lib/getLastTick';
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

const pipSizeAreEqual = (prevProps, nextProps) =>
    (nextProps.trade && prevProps.trade) &&
    (nextProps.trade.pipSize && prevProps.trade.pipSize) &&
        prevProps.trade.pipSize === nextProps.trade.pipSize;

export default (chart, prevProps, nextProps) => {
    const ticksDiffer = !ticksAreEqual(prevProps, nextProps);
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);
    const tradingTimesDiffer = !tradingTimesAreEqual(prevProps, nextProps);

    if (ticksDiffer) {
        updateTicks(chart, prevProps, nextProps);
    }

    if (contractsDiffer || ticksDiffer) {
        const { contract, trade, ticks } = nextProps;
        updateContract({ chart, contract: contract || trade, ticks });
    }

    if (tradingTimesDiffer) {
        const { tradingTimes } = nextProps;
        updateTradingTimes({ chart, tradingTimes });
    }

    if (nextProps.trade && nextProps.trade.pipSize && !pipSizeAreEqual(prevProps, nextProps)) {
        const { trade, ticks } = nextProps;
        chart.yAxis[0].update({
            labels: {
                formatter() {
                    return this.value.toFixed(trade.pipSize);
                },
            },
        });

        chart.series[0].update({
            tooltip: {
                valueDecimals: trade.pipSize,
            },
        });
    }
};
