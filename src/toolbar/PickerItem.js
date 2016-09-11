import React, { PureComponent } from 'react';
import styles from '../styles';

export default class PickerItem extends PureComponent {

    props: {
        text?: string,
        img?: string,
        value: any,
        onClick: (value: any) => void,
    };

    onClick = () => {
        const { value, onClick } = this.props;
        onClick(value);
    }

    render() {
        const { text, img } = this.props;

        return (
            <button
                key={text}
                style={styles.pickerItem}
                className="binary-chart-picker-item"
                onClick={this.onClick}
            >
                {img}{text}
            </button>
        );
    }
}
