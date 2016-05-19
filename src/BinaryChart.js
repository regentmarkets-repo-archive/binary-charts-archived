import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import * as BinaryTypes from './BinaryTypes';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

import spotIndicator from './plugins/spotIndicator';
// import tradeMarker from './plugins/tradeMarker';
import theme from './theme';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    exporting(Highcharts);
    spotIndicator();
//    tradeMarker();
    Highcharts.setOptions(theme);
}

function replaceEventHandler(type, handler) {
    console.log(Highcharts.Chart.prototype.callbacks)
    // Highcharts.Chart.prototype.callbacks[3] = chart => console.log(chart);
}

export default class BinaryChart extends Component {

    static propTypes = {
        symbol: PropTypes.string,
        ticks: BinaryTypes.tickArray,
        contract: BinaryTypes.contractOrTrade,
        pipSize: PropTypes.number,
        rangeChange: PropTypes.func,
        type: PropTypes.oneOf(['ticks', 'candles']),
        typeChange: PropTypes.func,
        trade: BinaryTypes.contractOrTrade,
        tradingTimes: BinaryTypes.tradingTimes,
    };

    static defaultProps = {
        ticks: [],
        pipSize: 0,
        type: 'ticks',
    };

    componentDidMount() {
        const config = initChart(this.props);
        config.chart.renderTo = this.refs.chart;
        this.chart = new Highcharts.StockChart(config);
        updateChart(this.chart, { ticks: [] }, this.props);
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.symbol !== nextProps.symbol) {
            this.chart.destroy();
            const config = initChart(nextProps);
            config.chart.renderTo = this.refs.chart;
            this.chart = new Highcharts.StockChart(config);
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
