import React, { PureComponent } from 'react';
import styles from '../styles';
import IntervalPicker from './IntervalPicker';
import TypePicker from './TypePicker';
// import IndicatorsPicker from './IndicatorsPicker';
import SharePicker from './SharePicker';
import CrosshairSwitcher from './CrosshairSwitcher';

type Props = {
    interval: string,
    type: string,
    crosshair?: boolean,
    chart: HighstockChart,
    hasInterval: boolean,
    getChart: () => any,
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
        const { getXAxis, getYAxis, getChart, onIntervalChange, onTypeChange } = this.props;

        return (
            <div style={styles.toolbar} className="binary-chart-toolbar">
                <TypePicker onChange={onTypeChange} />
                <IntervalPicker onChange={onIntervalChange} />
                <CrosshairSwitcher getXAxis={getXAxis} getYAxis={getYAxis} />
                {/* <IndicatorsPicker /> */}
                <SharePicker getChart={getChart} />
            </div>
        );
    }
}
