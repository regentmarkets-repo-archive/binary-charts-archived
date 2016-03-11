import React, { Component, PropTypes } from 'react';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import { areTickArraysEqual, tickToData } from './utils/DataUtils';
import configurator from './configurator';

import spotIndicator from './plugins/spot-indicator';
spotIndicator(ReactHighstock.Highcharts);

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
        }),
        trade: PropTypes.object,
    };

    shouldComponentUpdate(nextProps) {
        const newData = !areTickArraysEqual(this.props.ticks, nextProps.ticks);
        if (newData) {
            const chart = this.refs.chart.getChart();
            const lastTick = nextProps.ticks[nextProps.ticks.length - 1];
            chart.series[0].addPoint(tickToData(lastTick));
        }

        if (nextProps.contract != this.props.contract || nextProps.trade != this.props.trade)

        return false;
    }

    render() {
        const { contract, ticks, trade } = this.props;

        const config = configurator({ ticks, contract, trade });

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
