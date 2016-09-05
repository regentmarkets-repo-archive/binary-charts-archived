import React, { PureComponent } from 'react';

type Props = {
};

export default class ChartTypePicker extends PureComponent {

    props: Props;

    static defaultProps = {
    };

    render() {
        return (
            <select>
                <option>Area</option>
                <option>Line</option>
                <option>Candlesticks</option>
                <option>Bars</option>
            </select>
        );
    }
}
