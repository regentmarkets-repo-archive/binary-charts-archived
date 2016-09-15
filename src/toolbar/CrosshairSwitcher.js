import React, { PureComponent } from 'react';
import Crosshair from '../icons/Crosshair';
import styles, { colorText } from '../styles';

export default class ZoomControls extends PureComponent {

    props: {
        theme: string,
        getXAxis: () => any,
        getYAxis: () => any,
    };

    state: {
        crosshairOn: boolean,
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            crosshairOn: false,
        };
    }

    turnCrosshairOff = () => {
        const { getXAxis, getYAxis } = this.props;

        getYAxis().update({
            crosshair: false,
        });
        getXAxis().update({
            crosshair: false,
        });
    }

    turnCrosshairOn = () => {
        const { theme, getXAxis, getYAxis } = this.props;

        getYAxis().update({
            crosshair: {
                snap: false,
                label: {
                    enabled: true,
                    padding: 5,
                    format: '{value:.2f}',
                    style: {
                        color: colorText(theme, 1),
                        fontSize: '12px',
                    },
                },
            },
        });
        getXAxis().update({
            crosshair: {
                snap: false,
                label: {
                    enabled: true,
                    padding: 5,
                    style: {
                        color: colorText(theme, 1),
                        fontSize: '12px',
                    },
                },
            },
        });
    }

    toggleCrosshair = () => {
        const { crosshairOn } = this.state;
        this.setState({
            crosshairOn: !crosshairOn,
        });
        if (!crosshairOn) {
            this.turnCrosshairOn();
        } else {
            this.turnCrosshairOff();
        }
    }

    render() {
        const { crosshairOn } = this.state;
        const className = 'binary-chart-button' + (crosshairOn ? ' pressed' : '');

        return (
            <button className={className} style={styles.pickerButton} onClick={this.toggleCrosshair}>
                <Crosshair />
            </button>
        );
    }
}
