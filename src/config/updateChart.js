import shallowEqual from 'fbjs/lib/shallowEqual';
import areTickArraysEqual from 'binary-utils/lib/ticks/areTickArraysEqual';
import updateTicks from './updateTicks';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';
import updateAxis from './updateAxis';


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
    if (!ticksAreEqual(prevProps, nextProps)) {
        updateTicks(chart.series[0], prevProps, nextProps);
    }

    if (!contractsAreEqual(prevProps, nextProps)) { // todo: if ticks differ too?
        const { contract, trade, ticks } = nextProps;
        updateContract({ chart, contract, trade, ticks });
    }

    if (!tradingTimesAreEqual(prevProps, nextProps)) {
        const { tradingTimes } = nextProps;
        updateTradingTimes({ chart, tradingTimes });
    }

    if (nextProps.trade && nextProps.trade.pipSize && !pipSizeAreEqual(prevProps, nextProps)) {
        const { trade } = nextProps;
        updateAxis(chart.yAxis[0], {
            labels: {
                formatter() {return this.value.toFixed(trade.pipSize);}
            }
        })
    }
};
