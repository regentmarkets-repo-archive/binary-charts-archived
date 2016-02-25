import Echarts from 'echarts';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {optionsCombiner} from './utils/ChartsOptionsUtils';
import {createGrid} from './model/Grid';
import {createXAxis, createYAxis} from './model/Axis';

export default class BaseChart extends Component {
    static defaultProps = {
        grid: createGrid(),
        xAxis: createXAxis('X axis'),
        yAxis: createYAxis('Y axis')
    };

    static propTypes = {
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
            }),
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
        }))
    };


    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.echart = Echarts.init(node);
        this.updateCharts();
    }

    componentDidUpdate() {
        this.updateCharts();
    }

    compilePropsToOption() {
        const { grid, xAxis, yAxis, series } = this.props;
        return {grid, xAxis, yAxis, series};
    }

    updateCharts() {
        const newOpts = this.compilePropsToOption();
        this.echart.setOption(newOpts);
    }

    render() {
        return <div {...this.props} />;
    }
}