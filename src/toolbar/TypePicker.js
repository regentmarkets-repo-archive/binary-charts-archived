import React, { PureComponent } from 'react';
import Equalizer from 'react-material-design-icons/icons/Equalizer';
import Picker from './Picker';

type Props = {
    onChange: (chartType: string) => void,
    value: 'line' | 'area' | 'candlestick' | 'ohlc',
};

export default class TypePicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    onChange = (e: Proxy) =>
        this.props.onChange(e.target.value);

    render() {
        const { value } = this.props;

        return (
            <Picker
                img={<Equalizer />}
                text={value}
                items={[
                    { text: 'Area', onPick: this.onChange },
                    { text: 'Line', onPick: this.onChange },
                    { text: 'Candlesticks', onPick: this.onChange },
                    { text: 'Bars', onPick: this.onChange },
                ]}
            />
        );
    }
}
