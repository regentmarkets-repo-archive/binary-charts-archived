import React, { Component, PropTypes } from 'react';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import { areTickArraysEqual, doTicksDifferJustOneEntry, tickToData } from './utils/DataUtils';
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

    static defaultProps = {
        ticks: [],
    };

    shouldComponentUpdate(nextProps) {
        const dataIsSame = areTickArraysEqual(this.props.ticks, nextProps.ticks);
        if (!dataIsSame) {
            const series = this.refs.chart.getChart().series[0];
            const oneTickDiff = doTicksDifferJustOneEntry(this.props.ticks, nextProps.ticks);
            if (oneTickDiff) {
                const lastTick = nextProps.ticks[nextProps.ticks.length - 1];
                series.addPoint(tickToData(lastTick));
            } else {
                series.setData(nextProps.ticks.map(tickToData));
            }
        }

        // console.log(nextProps.trade != this.props.trade, nextProps.trade, this.props.trade);
        // if (nextProps.contract != this.props.contract || nextProps.trade != this.props.trade)

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
