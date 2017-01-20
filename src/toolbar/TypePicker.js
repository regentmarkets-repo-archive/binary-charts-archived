import React, { PureComponent } from 'react';
import { AreaIcon, BarIcon, CandlestickIcon, LineIcon } from '../icons';
import Picker from './Picker';

type Props = {
    allowOHLC: boolean,
    expanded: boolean,
    tooltip: string,
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

const typeLabel = {
    line: 'Line',
    area: 'Area',
    candlestick: 'Candlestick',
    ohlc: 'Bars',
    ha: 'Heikin Ashi',
};

export default class TypePicker extends PureComponent {

    props: Props;

    render() {
        const { allowOHLC, expanded, tooltip, value, onExpand, onChange } = this.props;

        const options = allowOHLC ? items : items.slice(0, 2);

        return (
            <Picker
                expanded={expanded}
                tooltip={tooltip}
                text={typeLabel[value]}
                img={options.find(x => x.value === value).img}
                items={options}
                onExpand={onExpand}
                onChange={onChange}
            />
        );
    }
}
