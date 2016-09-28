import React, { PureComponent } from 'react';
import styles from '../styles';

export default class InfoBar extends PureComponent {

    props: {
        point: Candle | Tick,
    };

    static defaultProps = {
        point: {},
    };

    render() {
        const { point } = this.props;

        return (
            <div style={styles.infobar} className="binary-chart-info-bar">
                <div><span>Open</span><span>{point.open}</span></div>
                <div><span>High</span><span>{point.high}</span></div>
                <div><span>Low</span><span>{point.low}</span></div>
                <div><span>Close</span><span>{point.close}</span></div>
            </div>
        );
    }
}
