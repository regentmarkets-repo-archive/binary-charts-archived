import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import noDataToDisplay from 'highcharts/modules/no-data-to-display.js';
import * as BinaryTypes from './BinaryTypes';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

import axisIndicators from './plugins/axisIndicators';
// import winLossIndicators from './plugins/winLossIndicators';
import addLoadingFlag from './plugins/addLoadingFlag';
// import tradeMarker from './plugins/tradeMarker';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    exporting(Highcharts);
    noDataToDisplay(Highcharts);
    axisIndicators();
//    winLossIndicators();
    addLoadingFlag();
//    tradeMarker();
}

export default class BinaryChart extends Component {

    static propTypes = {
        className: PropTypes.string,
        contract: BinaryTypes.contractOrTrade,
        defaultRange: PropTypes.number.isRequired,
        showAllRangeSelector: PropTypes.bool,
        events: BinaryTypes.events,
        height: PropTypes.number,
        id: PropTypes.string,
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

    componentDidMount() {
        this.createChart();
        updateChart(this.chart, { ticks: [] }, this.props);
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.symbol !== nextProps.symbol ||
                this.props.type !== nextProps.type ||
                this.props.noData !== nextProps.noData) {
            this.destroyChart();
            this.createChart(nextProps);
        }

        updateChart(this.chart, this.props, nextProps);

        return false;
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    createChart(newProps) {
        const props = newProps || this.props;
        const config = initChart(props);
        this.chart = new Highcharts.StockChart(this.chartDiv, config, chart => {
            if (!props.noData) {
                chart.showLoading();
            }
        });
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
        this.eventListeners.forEach(e => this.chartDiv.addEventListener(e.type, e.handler));
    }

    destroyChart() {
        this.eventListeners.forEach(e => {
            this.chartDiv.removeEventListener(e.type, e.handler);
        });
        this.chart.destroy();
    }

    render() {
        const { id, className } = this.props;
        return (
            <div ref={x => { this.chartDiv = x; }} id={id} className={className} />
        );
    }
}
