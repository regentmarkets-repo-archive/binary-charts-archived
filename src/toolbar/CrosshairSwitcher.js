import React, { PureComponent } from 'react';

export default class ZoomControls extends PureComponent {

    props: {
        getXAxis: () => any,
        getYAxis: () => any,
    };

    crosshairOff = () => {
        const { getXAxis, getYAxis } = this.props;

        getYAxis().update({
            crosshair: false,
        });
        getXAxis().update({
            crosshair: false,
        });
    }

    crosshairOn = () => {
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
                    padding: 5,
                    enabled: true,
                },
            },
        });
    }

    render() {
        return (
            <span>
                <button onClick={this.crosshairOff}>|\</button>
                <button onClick={this.crosshairOn}>
                    <img src="https://webtrader.binary.com/v2.1.11/images/crosshair.svg" alt="Crosshair" />
                </button>
            </span>
        );
    }
}
