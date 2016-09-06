import React, { PureComponent } from 'react';
import IntervalPicker from './IntervalPicker';
import ChartTypePicker from './ChartTypePicker';
// import IndicatorsPicker from './IndicatorsPicker';
import SharePicker from './SharePicker';

type Props = {
    interval: string,
    type: string,
    crosshair?: boolean,
    chart: HighstockChart,
    onIntervalChange: (interval: string) => void,
    onTypeChange: (chartType: string) => void,
};

export default class Toolbar extends PureComponent {

    props: Props;

    static defaultProps = {
        type: 'line',
    };

    render() {
        const { onIntervalChange, onTypeChange } = this.props;

        return (
            <div className="binary-chart-toolbar">
                <IntervalPicker onChange={onIntervalChange} />
                <ChartTypePicker onChange={onTypeChange} />
                {/* <IndicatorsPicker /> */}
                {/* [crosshair switcher] */}
                <button>+</button>
                <button>-</button>
                <SharePicker />
            </div>
        );
    }
}
