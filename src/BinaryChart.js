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

export default class BinaryChart extends Component {

    static propTypes = {
        symbol: PropTypes.string,
        ticks: BinaryTypes.tickArray,
        contract: BinaryTypes.contractOrTrade,
        pipSize: PropTypes.number,
        rangeChange: PropTypes.func,
        type: PropTypes.oneOf(['area', 'candlestick']),
        typeChange: PropTypes.func,
        trade: BinaryTypes.contractOrTrade,
        tradingTimes: BinaryTypes.tradingTimes,
    };

    static defaultProps = {
        ticks: [],
        pipSize: 0,
        type: 'area',
    };

    createChart(newProps) {
        const config = initChart(newProps || this.props);
        config.chart.renderTo = this.refs.chart;
        this.chart = new Highcharts.StockChart(config);
    }

    componentDidMount() {
        this.createChart();
        updateChart(this.chart, { ticks: [] }, this.props);
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    shouldComponentUpdate(nextProps) {
        if (
            this.props.symbol !== nextProps.symbol ||
                this.props.rangeChange !== nextProps.rangeChange
        ) {
            this.chart.destroy();
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
