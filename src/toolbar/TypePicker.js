import React, { PureComponent } from 'react';
import { Area, Bar, Candle, Line } from '../icons';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    value: ChartType,
    onExpand: () => void,
    onChange: (chartType: string) => void,
};

const items = [
    { text: 'Area', value: 'area', img: <Area /> },
    { text: 'Line', value: 'line', img: <Line /> },
    { text: 'Candlestick', value: 'candlestick', img: <Candle /> },
    { text: 'Bars', value: 'ohlc', img: <Bar /> },
];

export default class TypePicker extends PureComponent {

    props: Props;

    render() {
        const { expanded, value, onExpand, onChange } = this.props;

        return (
            <Picker
                expanded={expanded}
                img={items.find(x => x.value === value).img}
                items={items}
                onExpand={onExpand}
                onChange={onChange}
            />
        );
    }
}
