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
        contract: BinaryTypes.contractOrTrade,
        defaultRange: PropTypes.number.isRequired,
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
        this.chart.rangeSelector.clickButton(0, 0, true);
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    shouldComponentUpdate(nextProps) {
        if (
            this.props.symbol !== nextProps.symbol ||
                this.props.type !== nextProps.type                 // this might break when we have more chart type
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
