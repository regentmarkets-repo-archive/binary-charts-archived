import React, { PureComponent } from 'react';
import Equalizer from 'react-material-design-icons/icons/Equalizer';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    value: ChartType,
    onExpand: () => void,
    onChange: (chartType: string) => void,
};

export default class TypePicker extends PureComponent {

    props: Props;

    render() {
        const { expanded, value, onExpand, onChange } = this.props;

        return (
            <Picker
                expanded={expanded}
                img={<Equalizer />}
                text={value}
                items={[
                    { text: 'Area', value: 'area', onPick: this.onChange },
                    { text: 'Line', value: 'line', onPick: this.onChange },
                    { text: 'Candlestick', value: 'candlestick', onPick: this.onChange },
                    { text: 'Bars', value: 'ohlc', onPick: this.onChange },
                ]}
                onExpand={onExpand}
                onChange={onChange}
            />
        );
    }
}
