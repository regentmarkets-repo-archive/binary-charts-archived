import React, { PureComponent } from 'react';
import Picker from './Picker';

type Props = {
    expanded: boolean,
    onExpand: () => void,
    onChange: (interval: ChartInterval) => void,
};

export default class IntervalPicker extends PureComponent {

    props: Props;

    render() {
        const { expanded, onExpand, onChange } = this.props;

        return (
            <Picker
                expanded={expanded}
                text="Interval"
                items={[
                    { text: 'Ticks', onPick: onChange },
                    { text: '1 minute', value: 60, onPick: onChange },
                    { text: '5 minutes', value: 5 * 60, onPick: onChange },
                    { text: '15 minutes', value: 15 * 60, onPick: onChange },
                    { text: '1 hour', value: 60 * 60, onPick: onChange },
                    { text: '4 hours', value: 4 * 60 * 60, onPick: onChange },
                    { text: '1 day', value: 24 * 60 * 60, onPick: onChange },
                ]}
                onExpand={onExpand}
                onChange={onChange}
            />
        );
    }
}
