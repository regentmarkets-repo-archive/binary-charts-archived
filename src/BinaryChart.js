import React, { Component, PropTypes } from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import { areTickArraysEqual, doTicksDifferJustOneEntry, tickToData } from './utils/DataUtils';
import { fullConfig, updateChart } from './configurator';
import { getLastTick } from './_utils';

import spotIndicator from './plugins/spotIndicator';
spotIndicator();

// import tradeMarker from './plugins/tradeMarker';
// tradeMarker();

import theme from './theme/';
ReactHighstock.Highcharts.setOptions(theme);


export default class BinaryChart extends Component {

    static propTypes = {
        ticks: PropTypes.arrayOf(PropTypes.shape({
            epoch: PropTypes.number.isRequired,
            quote: PropTypes.number.isRequired,
        })).isRequired,
        contract: PropTypes.shape({
            barrier: PropTypes.number,
            entry_spot: PropTypes.string,
        }),
        trade: PropTypes.object,
    };

    static defaultProps = {
        ticks: [],
    };

    shouldComponentUpdate(nextProps) {
        const tickDataIsSame = this.props.symbol === nextProps.symbol &&
            areTickArraysEqual(this.props.ticks, nextProps.ticks);
        const { ticks } = nextProps;
        const lastTick = getLastTick(ticks);

        if (!tickDataIsSame) {
            const series = this.refs.chart.getChart().series[0];
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
            const chart = this.refs.chart.getChart();
            updateChart({ chart, contract, trade, ticks });
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
