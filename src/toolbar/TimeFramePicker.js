import React, { PureComponent } from 'react';

export default class TimeFramePicker extends PureComponent {

    props: {
        getXAxis: () => any,
    };

    setRange = (fromDistance: seconds) => {
        const xAxis = this.props.getXAxis();
        const to = xAxis.max;
        const from = xAxis.max - fromDistance * 1000;
        xAxis.setExtremes(from, to, true, false);
    };

    setRangeToMax = () => {
        const xAxis = this.props.getXAxis();
        const { dataMin, dataMax } = xAxis.getExtremes();
        xAxis.setExtremes(dataMin, dataMax, true, false);
    }

    render() {
        return (
            <div className="binary-chart-time-frame-picker">
                <button onClick={() => this.setRange(5 * 60)}>5min</button>
                <button onClick={() => this.setRange(15 * 60)}>15min</button>
                <button onClick={() => this.setRange(60 * 60)}>1hr</button>
                <button onClick={() => this.setRange(4 * 60 * 60)}>4hr</button>
                <button onClick={() => this.setRange(24 * 60 * 60)}>1day</button>
                <button onClick={() => this.setRange(5 * 25 * 60 * 60)}>5days</button>
                <button onClick={this.setRangeToMax}>Max</button>
            </div>
        );
    }
}
