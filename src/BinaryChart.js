import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import noDataToDisplay from 'highcharts/modules/no-data-to-display.js';
import * as BinaryTypes from './BinaryTypes';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

import axisIndicators from './plugins/axisIndicators';
import addLoadingFlag from './plugins/addLoadingFlag';
// import tradeMarker from './plugins/tradeMarker';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    exporting(Highcharts);
    noDataToDisplay(Highcharts);
    axisIndicators();
    addLoadingFlag();
//    tradeMarker();
}

export default class BinaryChart extends Component {
    static propTypes = {
        contract: BinaryTypes.contractOrTrade,
        defaultRange: PropTypes.number.isRequired,
        events: BinaryTypes.events,
        height: PropTypes.number,
        noData: PropTypes.bool,
        pipSize: PropTypes.number,
        rangeChange: PropTypes.func,
        symbol: PropTypes.string,
        ticks: BinaryTypes.tickArray,
        theme: PropTypes.string,
        trade: BinaryTypes.contractOrTrade,
        tradingTimes: BinaryTypes.tradingTimes,
        type: PropTypes.oneOf(['area', 'candlestick']),
        typeChange: PropTypes.func,
        width: PropTypes.number,
    };

    static defaultProps = {
        defaultRange: 6,
        events: [],
        theme: 'light',
        ticks: [],
        pipSize: 0,
        type: 'area',
        noData: false,
    };

    createChart(newProps) {
        const props = newProps || this.props;
        const config = initChart(props);
        config.chart.renderTo = this.refs.chart;
        this.chart = new Highcharts.StockChart(config);

        if (props.type === 'candlestick') {
            this.chart.xAxis[0].update({
                minRange: 10 * 60 * 1000,
            });
        }

        const self = this.chart;
        this.eventListeners = props.events.map(e => {
            function handler() {
                e.handler(self);
            }
            return { type: e.type, handler };
        });
        this.eventListeners.forEach(e => this.refs.chart.addEventListener(e.type, e.handler));

        if (!props.noData) {
            this.chart.showLoading();
        }
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
