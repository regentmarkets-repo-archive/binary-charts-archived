import React, { PureComponent } from 'react';

type Props = {
};

export default class IndicatorsPicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    render() {
        return (
            <select>
                <option>Indicators</option>
                <option>Simple Moving Average (SMA)</option>
                <option>Exponenital Moving Average (EMA)</option>
                <option>Bollinger Band (BB)</option>
                <option>Alligator</option>
                <option>Relative Strength Index (RSI)</option>
                <option>Moving Average Convergence Divergence (MACD)</option>
            </select>
        );
    }
}
