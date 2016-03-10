import React, { Component, PropTypes } from 'react';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import { areTicksEqual, tickToData } from './utils/DataUtils';
import configurator from './configurator';

import currentPriceIndicator from './plugins/current-price-indicator';
currentPriceIndicator(ReactHighstock.Highcharts);

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
        const newData = !areTicksEqual(this.props.ticks, nextProps.ticks);
        if (newData) {
            const chart = this.refs.chart.getChart();
            const lastTick = nextProps.ticks[nextProps.ticks.length - 1];
            chart.series[0].addPoint(tickToData(lastTick));
        }
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
