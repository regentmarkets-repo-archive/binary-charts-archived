import React, { PureComponent } from 'react';
import styles from '../styles';

export default class ZoomButton extends PureComponent {

    props: {
        img: any,
        tooltip: boolean,
        onClick: (e: SyntheticEvent) => void,
    };

    render() {
        const { img, tooltip, onClick } = this.props;
        return (
            <a
                style={styles.zoomButton}
                className="binary-chart-zoom-button"
                onClick={onClick}
            >
                {img}
                {tooltip && <div className="tooltip">{tooltip}</div>}
            </a>
        );
    }
}
