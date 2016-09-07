import React, { PureComponent } from 'react';

type Props = {
    onChange: (interval: ChartInterval) => void,
};

export default class IntervalPicker extends PureComponent {

    props: Props;

    render() {
        const { onChange } = this.props;
        return (
            <select onChange={e => onChange(e.target.value)}>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
                <option value={15 * 60}>15 minutes</option>
                <option value={60 * 60}>1 hour</option>
                <option value={4 * 60 * 60}>4 hours</option>
                <option value={24 * 60 * 60}>1 day</option>
            </select>
        );
    }
}
