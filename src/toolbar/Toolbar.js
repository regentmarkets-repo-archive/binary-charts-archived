import React, { PureComponent } from 'react';
import IntervalPicker from './IntervalPicker';
import ChartTypePicker from './ChartTypePicker';
// import IndicatorsPicker from './IndicatorsPicker';
import SharePicker from './SharePicker';
import ZoomControls from './ZoomControls';
import CrosshairSwitcher from './CrosshairSwitcher';

type Props = {
    interval: string,
    type: string,
    crosshair?: boolean,
    chart: HighstockChart,
    getXAxis: () => any,
    getYAxis: () => any,
    onIntervalChange: (interval: string) => void,
    onTypeChange: (chartType: string) => void,
};

export default class Toolbar extends PureComponent {

    props: Props;

    static defaultProps = {
        type: 'line',
    };

    render() {
        const { getXAxis, getYAxis, onIntervalChange, onTypeChange } = this.props;

        return (
            <div className="binary-chart-toolbar">
                <IntervalPicker onChange={onIntervalChange} />
                <ChartTypePicker onChange={onTypeChange} />
                <CrosshairSwitcher getXAxis={getXAxis} getYAxis={getYAxis} />
                {/* <IndicatorsPicker /> */}
                {/* [crosshair switcher] */}
                <ZoomControls getXAxis={getXAxis} />
                <SharePicker />
            </div>
        );
    }
}
