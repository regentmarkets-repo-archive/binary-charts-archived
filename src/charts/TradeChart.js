import React, { Component } from 'react';
import ReactHighstock from 'react-highcharts/bundle/ReactHighstock.src';

const reset = () => ({
    exporting: { enabled: false },
    scrollbar: { enabled: false },
    rangeSelector: { enabled: false },
    credits: { enabled: false },
    chart: {
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 150,
    },
});

const yAxis = config =>
    Object.assign(config, {
        yAxis: [{
            lineWidth: 1,
            opposite: true,
            labels: {
                align: 'right',
                x: 5
            }
        }]
    });

const yAxisPlotLines = config =>
    Object.assign(config, {
        yAxis: {
          plotLines: [{
              value: 12,
              color: 'green',
              dashStyle: 'shortdash',
              width: 2,
              label: {
                  text: 'Last quarter minimum'
              }
          }, {
              value: 20,
              color: 'red',
              dashStyle: 'shortdash',
              width: 2,
              label: {
                  text: 'Last quarter maximum'
              }
          }]
        }
    });

const yAxisPlotBand = config =>
    Object.assign(config, {
        yAxis: {
            plotBands: [{
                from: 15,
                to: 20,
                color: 'rgba(68, 170, 213, 0.2)',
                label: {
                    text: 'Last quarter year\'s value range'
                }
            }]
        }
    });


const series = (config, data) =>
    Object.assign(config, {
        series: [{
            name: 'Something',
            data,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });

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
