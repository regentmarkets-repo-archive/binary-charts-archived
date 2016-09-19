import React, { PureComponent } from 'react';
import { AreaIcon, BarIcon, CandlestickIcon, LineIcon } from '../icons';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    value: ChartType,
    onExpand: () => void,
    onChange: (chartType: string) => void,
};

const items = [
    { text: 'Area', value: 'area', img: <AreaIcon /> },
    { text: 'Line', value: 'line', img: <LineIcon /> },
    { text: 'Candlestick', value: 'candlestick', img: <CandlestickIcon /> },
    { text: 'Bars', value: 'ohlc', img: <BarIcon /> },
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
