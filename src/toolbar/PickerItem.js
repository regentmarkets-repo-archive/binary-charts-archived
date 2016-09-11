import React, { PureComponent } from 'react';
import styles from '../styles';

export default class PickerItem extends PureComponent {

    props: {
        text?: string,
        img?: string,
        onClick: (e: SyntheticEvent) => void,
    };

    render() {
        const { text, img, onClick } = this.props;

        return (
            <button
                key={text}
                style={styles.pickerItem}
                className="binary-chart-picker-item"
                onClick={onClick}
            >
                {img}{text}
            </button>
        );
    }
}
