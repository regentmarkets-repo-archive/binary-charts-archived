import React, { PureComponent } from 'react';
import styles from '../styles';

export default class PickerItem extends PureComponent {

    props: {
        text?: string,
        img?: any,
        value: any,
        onClick: (value: any) => void,
        propagateEvent: boolean,
    };

    onClick = (e: SyntheticEvent) => {
        const { value, onClick, propagateEvent } = this.props;
        onClick(value);

        if (!propagateEvent) {
            e.stopPropagation();
        }
    }

    render() {
        const { text, img } = this.props;

        return (
            <a
                key={text}
                style={styles.pickerItem}
                className="binary-chart-picker-item"
                onClick={this.onClick}
            >
                {img}
                {text && <span>{text}</span>}
            </a>
        );
    }
}
