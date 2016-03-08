import React, { Component } from 'react';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';
import reset from './reset';
import yAxis from './yAxis';
import yAxisPlotLines from './yAxisPlotLines';
import yAxisPlotBand from './yAxisPlotBand';
import series from './series';


const config = data => series(yAxisPlotBand(yAxisPlotLines(yAxis(reset()))), data);

export default class TradeChart extends Component {

    render() {
        const { ticks } = this.props;

        return <ReactHighstock
            isPureConfig
            config={config(ticks)}
            {...this.props}
        />;
    }
}
