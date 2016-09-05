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
                <option>Ticks</option>
                <option>1 Minute</option>
                <option>5 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>1 Day</option>
            </select>
        );
    }
}
