import Echarts from 'echarts';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {combineOptions} from './../utils/ChartsOptionsUtils';
import {createGrid} from './../model/Grid';
import {createXAxis, createYAxis} from './../model/Axis';
import {createDefaultDataZoom} from './../model/DataZoom';
import {createTooltip} from './../model/Tooltip';

export default class BaseChart extends Component {
    static defaultProps = {
        grid: createGrid(),
        color: ['#dd77dd', '#660066', '#ccccff', '#3366ff', '#f4cad3', '#922307', '#fcd04a'],
        xAxis: createXAxis('X axis'),
        yAxis: createYAxis('Y axis'),
        dataZoom: createDefaultDataZoom(),
    };

    static propTypes = {
        legend: PropTypes.shape({
            data: PropTypes.array,
        }),
        grid: PropTypes.shape({
            left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
        xAxis: PropTypes.shape({
            name: PropTypes.string,
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
            name: PropTypes.string,
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
        const {series, xAxis, yAxis, legend, tooltip} = nextProps;
        const opts = {};
        if (series) opts.series = series;
        if (xAxis) opts.xAxis = xAxis;
        if (yAxis) opts.yAxis = yAxis;
        if (legend) opts.legend = legend;
        if (tooltip) opts.tooltip = tooltip;

        this.updateCharts(opts);
        this.echart.resize();
    }

    compilePropsToOption() {
        const { grid, xAxis, yAxis, series, dataZoom, tooltip, legend, color } = this.props;
        return {grid, xAxis, yAxis, series, dataZoom, tooltip, legend, color};
    }

    updateCharts(opts) {
        this.echart.setOption(opts);
    }

    render() {
        return <div {...this.props} />;
    }
}
