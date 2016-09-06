import React, { PureComponent } from 'react';

export default class ZoomControls extends PureComponent {

    props: {
        getXAxis: () => any,
    };

    zoomIn = () => {
        const xAxis = this.props.getXAxis();
        const halfDiff = (xAxis.max - xAxis.min) / 2;
        xAxis.setExtremes(xAxis.min + halfDiff, xAxis.max, true, false);
    }

    zoomOut = () => {
        const xAxis = this.props.getXAxis();
        const diff = xAxis.max - xAxis.min;
        const newMin = xAxis.min - diff;
        xAxis.setExtremes(newMin < xAxis.dataMin ? xAxis.DataMin : newMin, xAxis.max, true, false);
    }

    moveToEnd = () => {
        const xAxis = this.props.getXAxis();
        const diff = xAxis.max - xAxis.min;
        xAxis.setExtremes(xAxis.dataMax - diff, xAxis.dataMax, true, false);
    }

    render() {
        return (
            <span>
                <button onClick={this.zoomIn}>+</button>
                <button onClick={this.zoomOut}>-</button>
                <button onClick={this.moveToEnd}>></button>
            </span>
        );
    }
}
