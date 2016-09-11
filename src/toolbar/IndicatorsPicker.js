import React, { PureComponent } from 'react';
import Picker from './Picker';

type Props = {
};

export default class IndicatorsPicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    onChange = () => {};

    render() {
        return (
            <Picker
                text="Indicators"
                items={[
                    { text: 'Simple Moving Average (SMA)', onPick: this.onChange },
                    { text: 'Exponenital Moving Average (EMA)', onPick: this.onChange },
                    { text: 'Bollinger Band (BB)', onPick: this.onChange },
                    { text: 'Relative Strength Index (RSI)', onPick: this.onChange },
                    { text: 'Moving Average Convergence Divergence (MACD)', onPick: this.onChange },
                ]}
            />
        );
    }
}
