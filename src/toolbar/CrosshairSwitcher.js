import React, { PureComponent } from 'react';
import Games from 'react-material-design-icons/icons/Games';

export default class ZoomControls extends PureComponent {

    props: {
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
        const { getXAxis, getYAxis } = this.props;

        getYAxis().update({
            crosshair: {
                snap: false,
                label: {
                    enabled: true,
                    padding: 5,
                    format: '{value:.2f}',
                },
            },
        });
        getXAxis().update({
            crosshair: {
                label: {
                    enabled: true,
                    padding: 5,
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
        const className = 'binary-chart-crosshair-switcher' + (crosshairOn ? ' pressed' : '');

        return (
            <button className={className} onClick={this.toggleCrosshair}>
                <Games />
            </button>
        );
    }
}
