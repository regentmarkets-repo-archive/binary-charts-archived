import Echarts from 'echarts';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {combineOptions} from './../utils/ChartsOptionsUtils';
import {createGrid} from './../model/Grid';
import {createXAxis, createYAxis} from './../model/Axis';
import {createDefaultDataZoom} from './../model/DataZoom';
import {createTooltip} from './../model/Tooltip';
import {createTitle} from './../model/Title';

export default class BaseChart extends Component {
    static defaultProps = {
        grid: createGrid(),
        color: ['#dd77dd', '#660066', '#ccccff', '#3366ff', '#f4cad3', '#922307', '#fcd04a'],
        xAxis: createXAxis('X axis'),
        yAxis: createYAxis('Y axis'),
        tooltip: createTooltip('mousemove', 'axis', (params) => {
            const x = params[0].value[0];
            const y = params[0].value[1];
            return `${x}: ${y}`;
        }),
        dataZoom: createDefaultDataZoom(),
        title: createTitle('BaseChart'),
    };

    static propTypes = {
        legend: PropTypes.shape({
            data: PropTypes.array,
        }),
        grid: PropTypes.shape({
            left: PropTypes.string,
            right: PropTypes.string,
            top: PropTypes.string,
            bottom: PropTypes.string,
        }),
        xAxis: PropTypes.shape({
            name: PropTypes.string.isRequired,
            data: PropTypes.array,
            type: PropTypes.oneOf(['category', 'value']),
            position: PropTypes.oneOf(['top', 'bottom']),
            axisLine: PropTypes.shape({
                lineStyle: PropTypes.object,
            }),
            axisTick: PropTypes.shape({
                lineStyle: PropTypes.object,
            })
        }),
        yAxis: PropTypes.shape({
            name: PropTypes.string.isRequired,
            data: PropTypes.array,
            type: PropTypes.oneOf(['category', 'value']),
            position: PropTypes.oneOf(['left', 'right']),
            axisLine: PropTypes.shape({
                lineStyle: PropTypes.object,
            }),
            axisTick: PropTypes.shape({
                lineStyle: PropTypes.object,
            }),
        }),
        series: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.oneOf(['line', 'bar', 'candlestick']).isRequired,
            name: PropTypes.string,
            data: PropTypes.array.isRequired,
        })),
        dataZoom: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
        })),
        tooltip: PropTypes.shape({
            trigger: PropTypes.oneOf(['item', 'axis']),
            triggerOn: PropTypes.oneOf(['mousemove', 'click']),
        }),
        title: PropTypes.shape({
            text: PropTypes.string.isRequired,
        }),
        color: PropTypes.array,
        onZoom: PropTypes.func,
    };

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.echart = Echarts.init(node);
        const opts = this.compilePropsToOption();
        this.updateCharts(opts);
    }

    componentDidUpdate(nextProps) {
        const {series, xAxis, yAxis} = nextProps;
        const opts = {};
        if (series) opts.series = series;
        if (xAxis) opts.xAxis = xAxis;
        if (yAxis) opts.yAxis = yAxis;

        this.updateCharts(opts, false, true);
    }

    compilePropsToOption() {
        const { grid, xAxis, yAxis, series, dataZoom, tooltip, title, legend, color } = this.props;
        return {grid, xAxis, yAxis, series, dataZoom, tooltip, title, legend, color};
    }

    updateCharts(opts) {
        this.echart.setOption(opts);
    }

    render() {
        return <div {...this.props} />;
    }
}