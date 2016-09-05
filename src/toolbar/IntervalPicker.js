import React, { PureComponent } from 'react';

type Props = {
};

export default class IntervalPicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    render() {
        return (
            <select>
                <option value="ticks">Ticks</option>
                <option value="10s">10 seconds</option>
                <option value="20s">20 seconds</option>
                <option value="1m">1 minute</option>
                <option value="5m">5 minutes</option>
                <option value="15m">15 minutes</option>
                <option value="1h">1 hour</option>
                <option value="4h">4 hours</option>
                <option value="1d">1 day</option>
            </select>
        );
    }
}
