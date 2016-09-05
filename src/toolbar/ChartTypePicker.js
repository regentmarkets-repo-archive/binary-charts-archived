import React, { PureComponent } from 'react';

type Props = {
    onChange: (chartType: string) => void,
    value: 'line' | 'area' | 'candlestick' | 'ohlc',
};

export default class ChartTypePicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    onChange = (e: Proxy) =>
        this.props.onChange(e.target.value);

    render() {
        const { value } = this.props;

        return (
            <select onChange={this.onChange} value={value}>
                <option value="area">Area</option>
                <option value="line">Line</option>
                <option value="candlestick">Candlesticks</option>
                <option value="ohlc">Bars</option>
            </select>
        );
    }
}
