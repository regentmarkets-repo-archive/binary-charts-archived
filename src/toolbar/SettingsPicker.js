import React, { PureComponent } from 'react';
import { SettingsIcon } from '../icons';
import styles from '../styles';

export default class SettingsPicker extends PureComponent {

    render() {
        return (
            <button className="binary-chart-button" style={styles.pickerButton}>
                <SettingsIcon />
            </button>
        );
    }
}
