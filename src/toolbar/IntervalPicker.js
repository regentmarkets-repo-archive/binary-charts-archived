import React, { PureComponent } from 'react';
import Picker from './Picker';

type Props = {
    onChange: (interval: ChartInterval) => void,
};

export default class IntervalPicker extends PureComponent {

    props: Props;

    render() {
        const { onChange } = this.props;
        return (
            <Picker
                text="Interval"
                items={[
                    { text: '1 minute', onPick: onChange },
                    { text: '5 minutes', onPick: onChange },
                    { text: '15 minutes', onPick: onChange },
                    { text: '1 hour', onPick: onChange },
                    { text: '4 hours', onPick: onChange },
                    { text: '1 day', onPick: onChange },
                ]}
            />
        );
    }
}
