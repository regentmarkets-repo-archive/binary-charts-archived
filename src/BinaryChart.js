import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import noDataToDisplay from 'highcharts/modules/no-data-to-display.js';
import * as BinaryTypes from './BinaryTypes';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

import axisIndicators from './plugins/axisIndicators';
// import tradeMarker from './plugins/tradeMarker';
import theme from './theme';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    exporting(Highcharts);
    noDataToDisplay(Highcharts);
    axisIndicators();
//    tradeMarker();
    Highcharts.setOptions(theme);
}

export default class BinaryChart extends Component {
    static propTypes = {
        contract: BinaryTypes.contractOrTrade,
        defaultRange: PropTypes.number.isRequired,
        events: BinaryTypes.events,
        height: PropTypes.number,
        pipSize: PropTypes.number,
        rangeChange: PropTypes.func,
        symbol: PropTypes.string,
        ticks: BinaryTypes.tickArray,
        trade: BinaryTypes.contractOrTrade,
        tradingTimes: BinaryTypes.tradingTimes,
        type: PropTypes.oneOf(['area', 'candlestick']),
        typeChange: PropTypes.func,
        width: PropTypes.number,
    };

    static defaultProps = {
        defaultRange: 0,
        events: [],
        ticks: [],
        pipSize: 0,
        type: 'area',
    };

    createChart(newProps) {
        const props = newProps || this.props;
        const config = initChart(props);
        config.chart.renderTo = this.refs.chart;
        this.chart = new Highcharts.StockChart(config);

        const self = this.chart;
        this.eventListeners = props.events.map(e => {
            function handler() {
                e.handler(self);
            }
            return { type: e.type, handler };
        });
        this.eventListeners.forEach(e => this.refs.chart.addEventListener(e.type, e.handler));
    }

    destroyChart() {
        this.eventListeners.forEach(e => {
            this.refs.chart.removeEventListener(e.type, e.handler);
        });
        this.chart.destroy();
    }

    componentDidMount() {
        this.createChart();
        updateChart(this.chart, { ticks: [] }, this.props);
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    shouldComponentUpdate(nextProps) {
        if (
            this.props.symbol !== nextProps.symbol ||
                this.props.type !== nextProps.type                 // this might break when we have more chart type
        ) {
            this.destroyChart();
            this.createChart(nextProps);
        }

        updateChart(this.chart, this.props, nextProps);
        return false;
    }

    render() {
        return (
            <div {...this.props} ref="chart" />
        );
    }
}
