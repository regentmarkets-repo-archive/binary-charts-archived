import React, { PureComponent } from 'react';
import { AnalysisIcon, CheckboxIcon, CheckboxOutlineIcon } from '../icons';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    tooltip: string,
    onExpand: () => void,
    onChange: (indicator: string) => void,
};

const items = [
    { text: 'Simple Moving Average (SMA)', value: 'sma', img: <CheckboxIcon /> },
    { text: 'Exponenital Moving Average (EMA)', value: 'ema', img: <CheckboxOutlineIcon /> },
    { text: 'Bollinger Band (BB)', value: 'bb', img: <CheckboxOutlineIcon /> },
    // { text: 'Relative Strength Index (RSI)', value: 'rsi', img: <CheckboxOutlineIcon /> },
    // { text: 'Moving Average Convergence Divergence (MACD)', value: 'macd', img: <CheckboxOutlineIcon /> },
];

export default class IndicatorsPicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    onChange = () => {};

    render() {
        const { expanded, tooltip, onExpand } = this.props;

        return (
            <Picker
                expanded={expanded}
                tooltip={tooltip}
                img={<AnalysisIcon width="16px" height="16px" />}
                text="Indicators"
                items={items}
                onExpand={onExpand}
                onChange={this.onChange}
            />
        );
    }
}
