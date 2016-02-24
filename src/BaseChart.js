import Echarts from 'echarts';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class BaseChart extends Component {

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        this.echart = Echarts.init(node);
        const { options } = this.props;
        this.echart.setOption(options);
    }

    componentDidUpdate(nextProps) {
        this.echart.setOption(nextProps.options);
    }

    render() {
        return <div {...this.props} />;
    }
}