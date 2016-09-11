import React, { PureComponent } from 'react';
import Share from 'react-material-design-icons/icons/Share';
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
        const { value, onChange } = this.props;

        return (
            // <select onChange={this.onChange} value={value}>
            //     <option value="area">Area</option>
            //     <option value="line">Line</option>
            //     <option value="candlestick">Candlesticks</option>
            //     <option value="ohlc">Bars</option>
            // </select>
            <Picker
                img={<Share />}
                text={value}
                items={[
                    { text: 'Area', onPick: onChange },
                    { text: 'Line', onPick: onChange },
                    { text: 'Candlesticks', onPick: onChange },
                    { text: 'OHLC Bars', onPick: onChange },
                ]}
            />
        );
    }
}
