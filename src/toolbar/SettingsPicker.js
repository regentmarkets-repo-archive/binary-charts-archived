import React, { PureComponent } from 'react';
import Settings from 'react-material-design-icons/icons/Settings';
import styles from '../styles';

export default class SettingsPicker extends PureComponent {

    render() {
        return (
            <button className="binary-chart-button" style={styles.pickerButton}>
                <Settings />
            </button>
        );
    }
}
