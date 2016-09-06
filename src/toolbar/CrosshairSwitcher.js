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
                label: {
                    enabled: true,
                    format: '{value:.2f}',
                },
            },
        });
        getXAxis().update({
            crosshair: {
                label: {
                    enabled: true,
                },
            },
        });
    }

    render() {
        return (
            <span>
                <button onClick={this.crosshairOff}>X Off</button>
                <button onClick={this.crosshairOn}>X On</button>
            </span>
        );
    }
}
