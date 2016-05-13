import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts/highstock';
import * as BinaryTypes from './BinaryTypes';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

import spotIndicator from './plugins/spotIndicator';
// import tradeMarker from './plugins/tradeMarker';
import theme from './theme';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    spotIndicator();
//    tradeMarker();
    Highcharts.setOptions(theme);
}

export default class BinaryChart extends Component {

    static propTypes = {
        symbol: PropTypes.string,
        ticks: BinaryTypes.tickArray,
        contract: BinaryTypes.contractOrTrade,
        rangeChange: PropTypes.func,
        type: PropTypes.oneOf(['area', 'candlestick']),
        trade: BinaryTypes.contractOrTrade,
        tradingTimes: BinaryTypes.tradingTimes,
    };

    static defaultProps = {
        ticks: [],
        type: 'area',
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
        updateChart(this.chart, this.props, nextProps);
        return false;
    }

    render() {
        return (
            <div>
                <div {...this.props} ref="chart" />
                <input type="radio" name="chart-type" value="tick" /> Ticks <br />
                <input type="radio" name="chart-type" value="candle-stick" /> Candle Stick <br />
            </div>
        );
    }
}
