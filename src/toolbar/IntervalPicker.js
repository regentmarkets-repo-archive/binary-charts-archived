import React, { PureComponent } from 'react';
import Picker from './Picker';
import intervalList from './intervalList';

type Props = {
    expanded: boolean,
    tooltip: string,
    value: number,
    onExpand: () => void,
    onChange: (interval: ChartInterval) => void,
};

export default class IntervalPicker extends PureComponent {

    props: Props;

    render() {
        const { value, tooltip, expanded, onExpand, onChange } = this.props;
        const intervalText = intervalList.find(x => x.value === value).text;
        return (
            <Picker
                expanded={expanded}
                tooltip={tooltip}
                text={intervalText}
                items={intervalList}
                onExpand={onExpand}
                onChange={onChange}
            />
        );
    }
}
