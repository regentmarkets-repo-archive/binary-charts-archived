import React, { PureComponent } from 'react';
import IntervalPicker from './IntervalPicker';
import ChartTypePicker from './ChartTypePicker';
import IndicatorsPicker from './IndicatorsPicker';
import SharePicker from './SharePicker';

type Props = {
    interval: string,
    type: string,
    crosshair: boolean,
};

export default class Toolbar extends PureComponent {

    props: Props;

    static defaultProps = {
        type: 'line',
    };

    render() {
        return (
            <div className="binary-chart-toolbar">
                <IntervalPicker />
                <ChartTypePicker />
                <IndicatorsPicker />
                [crosshair]
                <SharePicker />
            </div>
        );
    }
}
