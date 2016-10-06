import React, { PureComponent } from 'react';
import { AnalysisIcon, CheckboxIcon, CheckboxOutlineIcon } from '../icons';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    tooltip: string,
    onExpand: () => void,
    onChange: (indicator: string) => void,
};

const uncheckedIcon = <CheckboxOutlineIcon />;
const checkedIcon = <CheckboxIcon />;

const defaultItems = [
    { text: 'Simple Moving Average (SMA)', value: 'sma', img: uncheckedIcon, checked: false },
    { text: 'Exponenital Moving Average (EMA)', value: 'ema', img: uncheckedIcon, checked: false },
    { text: 'Bollinger Band (BB)', value: 'bb', img: uncheckedIcon, checked: false },
    // { text: 'Relative Strength Index (RSI)', value: 'rsi', img: <CheckboxOutlineIcon /> },
    // { text: 'Moving Average Convergence Divergence (MACD)', value: 'macd', img: <CheckboxOutlineIcon /> },
];

export default class IndicatorsPicker extends PureComponent {

    props: Props;

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            items: defaultItems,
        };
    }

    onChange = (val) => {
        const { onChange } = this.props;

        const updatedItems = this.state.items.map(i => {
            if (i.value === val) {
                const copied = Object.assign({}, i);    // defensive copying

                copied.img = i.checked ? uncheckedIcon : checkedIcon;

                copied.checked = !i.checked;

                return copied;
            }
            return i;
        });

        this.setState({ items: updatedItems });

        onChange(updatedItems.filter(i => i.checked).map(i => i.value));
    };

    render() {
        const { expanded, tooltip, onExpand } = this.props;
        const { items } = this.state;
        return (
            <Picker
                expanded={expanded}
                tooltip={tooltip}
                img={<AnalysisIcon width="16px" height="16px" />}
                text="Indicators"
                items={items}
                onExpand={onExpand}
                onChange={this.onChange}
                propagateEvent={false}
            />
        );
    }
}
