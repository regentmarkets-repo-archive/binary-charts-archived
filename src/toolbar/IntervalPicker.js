import React, { PureComponent } from 'react';
import Picker from './Picker';
import intervalList from './intervalList';

type Props = {
    value: number,
    expanded: boolean,
    onExpand: () => void,
    onChange: (interval: ChartInterval) => void,
};

export default class IntervalPicker extends PureComponent {

    props: Props;

    render() {
        const { value, expanded, onExpand, onChange } = this.props;
        const intervalText = intervalList.find(x => x.value === value).text;
        return (
            <Picker
                expanded={expanded}
                text={intervalText}
                items={intervalList}
                onExpand={onExpand}
                onChange={onChange}
            />
        );
    }
}
