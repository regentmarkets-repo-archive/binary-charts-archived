import React, { PureComponent } from 'react';

type Props = {
    getAxis: () => any,
    onChange: (from: Date, to: Date) => void,
};

export default class TimeFramePicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    setRange = (fromDistance: seconds) => {
        const xAxis = this.props.getAxis();
        const to = xAxis.max;
        const from = xAxis.max - fromDistance * 1000;
        xAxis.setExtremes(from, to, true);
    };

    setRangeToMax = () => {
        const xAxis = this.props.getAxis();
        xAxis.setExtremes(xAxis.min, xAxis.max, true);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setRange(5 * 60)}>5min</button>
                <button onClick={() => this.setRange(15 * 60)}>15min</button>
                <button onClick={() => this.setRange(60 * 60)}>1hr</button>
                <button onClick={() => this.setRange(4 * 60 * 60)}>4hr</button>
                <button onClick={() => this.setRange(24 * 60 * 60)}>1day</button>
                <button onClick={() => this.setRange(5 * 25 * 60 * 60)}>5days</button>
                <button value="max">Max</button>
            </div>
        );
    }
}
