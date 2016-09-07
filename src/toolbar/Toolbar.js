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
    hasInterval: boolean,
    getXAxis: () => any,
    getYAxis: () => any,
    onIntervalChange: (interval: string) => void,
    onTypeChange: (chartType: string) => void,
};

export default class Toolbar extends PureComponent {

    props: Props;

    static defaultProps = {
        type: 'line',
        hasInterval: false,
    };

    render() {
        const { hasInterval, getXAxis, getYAxis, onIntervalChange, onTypeChange } = this.props;

        return (
            <div className="binary-chart-toolbar">
                <ChartTypePicker onChange={onTypeChange} />
                {hasInterval && <IntervalPicker onChange={onIntervalChange} />}
                <CrosshairSwitcher getXAxis={getXAxis} getYAxis={getYAxis} />
                {/* <IndicatorsPicker /> */}
                {/* [crosshair switcher] */}
                <ZoomControls getXAxis={getXAxis} />
                <SharePicker />
            </div>
        );
    }
}
