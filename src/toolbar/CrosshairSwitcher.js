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
                <button onClick={this.crosshairOff}>X Off</button>
                <button onClick={this.crosshairOn}>X On</button>
            </span>
        );
    }
}
