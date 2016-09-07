import React, { PureComponent } from 'react';
import styles from '../styles';

const options = [
    { text: '5min', seconds: 5 * 60 },
    { text: '15min', seconds: 15 * 60 },
    { text: '1hr', seconds: 60 * 60 },
    { text: '4hr', seconds: 4 * 60 * 60 },
    { text: '1day', seconds: 24 * 60 * 60 },
    { text: '5day', seconds: 5 * 25 * 60 * 60 },
];

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
            <div style={styles.timeFramePicker} className="binary-chart-time-frame-picker">
                {options.map(x =>
                    <button
                        key={x.text}
                        style={styles.timeFrameButton}
                        onClick={() => this.setRange(x.seconds)}
                    >
                        {x.text}
                    </button>
                )}
                <button style={styles.timeFrameButton} onClick={this.setRangeToMax}>Max</button>
            </div>
        );
    }
}
