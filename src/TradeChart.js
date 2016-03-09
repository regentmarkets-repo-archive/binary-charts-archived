import React, { Component, PropTypes } from 'react';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import ChartConfig from './ChartConfig';

// import currentPriceIndicator from './plugins/current-price-indicator';
// console.log(currentPriceIndicator);
// currentPriceIndicator(ReactHighstock.Highcharts);

import { areTicksEqual, tickToData } from './utils/DataUtils';

import theme from './theme';
ReactHighstock.Highcharts.setOptions(theme);

export default class TradeChart extends Component {

    static propTypes = {
        ticks: PropTypes.arrayOf(PropTypes.shape({
            epoch: PropTypes.number.isRequired,
            quote: PropTypes.number.isRequired,
        })).isRequired,
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
        const { ticks } = this.props;

        const config =
            new ChartConfig()
                .navigator()
                .yAxis()
                .yAxisPlotLines()
                .yAxisPlotBand()
                .xAxis()
                .spot(10)
                .series(ticks);;
                // .markerLastSpot();

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
