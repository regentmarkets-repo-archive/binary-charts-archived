import React, { Component, PropTypes } from 'react';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import ChartConfig from './ChartConfig';

export default class TradeChart extends Component {

    static propTypes = {
        ticks: PropTypes.arrayOf(PropTypes.shape({
            epoch: PropTypes.number.isRequired,
            quote: PropTypes.number.isRequired,
        })).isRequired,
    };

    render() {
        const { ticks } = this.props;

        const config =
            new ChartConfig()
                .yAxis()
                .yAxisPlotLines()
                .yAxisPlotBand()
                .xAxis()
                .series(ticks);

        return (
            <ReactHighstock
                isPureConfig
                config={config}
                {...this.props}
            />
        );
    }
}
