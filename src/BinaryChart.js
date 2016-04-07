import React, { Component, PropTypes } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import { areTickArraysEqual, doTicksDifferJustOneEntry, tickToData } from './_utils';
import { fullConfig, updateChart } from './configurator';
import { getLastTick } from './_utils';


import spotIndicator from './plugins/spotIndicator';
// import tradeMarker from './plugins/tradeMarker';
import theme from './theme/';

// crazy workaround for tests to work, hopefully will resolve soon
if (Object.keys(ReactHighstock.Highcharts).length > 0) {
    spotIndicator();
// tradeMarker();
    ReactHighstock.Highcharts.setOptions(theme);
}

const barrierType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]);

const contractOrTradeShape = PropTypes.shape({
    barrier: barrierType,
    barrier2: barrierType,
    contract_type: PropTypes.string.isRequired,
    date_expiry: PropTypes.number,
    date_settlement: PropTypes.number,
    date_start: PropTypes.number,
    entry_spot: PropTypes.number,
    entry_tick_time: PropTypes.number,
    exit_tick_time: PropTypes.number,
    expiry_time: PropTypes.number,
    purchase_time: PropTypes.number,
    sell_spot_time: PropTypes.number,
});

const tickArrayType = PropTypes.arrayOf(PropTypes.shape({
    epoch: PropTypes.number.isRequired,
    quote: PropTypes.number.isRequired,
}));

export default class BinaryChart extends Component {

    static propTypes = {
        symbol: PropTypes.string,
        ticks: PropTypes.oneOfType([
            tickArrayType,
            PropTypes.function,
        ]).isRequired,
        contract: contractOrTradeShape,
        trade: contractOrTradeShape,
    };

    static defaultProps = {
        ticks: [],
    };

    componentDidMount() {
        this.chart = this.refs.chart.getChart();
    }

    shouldComponentUpdate(nextProps) {
        const tickDataIsSame = this.props.symbol === nextProps.symbol &&
            areTickArraysEqual(this.props.ticks, nextProps.ticks);
        const { ticks } = nextProps;
        const lastTick = getLastTick(ticks);

        if (!tickDataIsSame) {
            const series = this.chart.series[0];
            const oneTickDiff = doTicksDifferJustOneEntry(this.props.ticks, nextProps.ticks);

            if (oneTickDiff) {
                series.addPoint(tickToData(lastTick));
            } else {
                series.setData(ticks.map(tickToData));
            }
        }

        if (!shallowEqual(nextProps.contract, this.props.contract) ||
            !shallowEqual(nextProps.trade, this.props.trade) ||
            !tickDataIsSame) {
            const { contract, trade } = nextProps;
            updateChart({ chart: this.chart, contract, trade, ticks });
        }

        return false;
    }

    render() {
        const { contract, ticks, trade } = this.props;

        const config = fullConfig({ ticks, contract, trade });

        return (
            <ReactHighstock
                isPureConfig
                ref="chart"
                config={config}
                {...this.props}
            />
        );
    }
}
