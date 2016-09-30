import React, { PureComponent } from 'react';
import styles from '../styles';
import defaultTooltips from '../tooltips';
import IntervalPicker from './IntervalPicker';
import TypePicker from './TypePicker';
import IndicatorsPicker from './IndicatorsPicker';
import SharePicker from './SharePicker';
// import CrosshairSwitcher from './CrosshairSwitcher';
// import SettingsPicker from './SettingsPicker';

type Props = {
    assetName: string,
    interval: string,
    type: string,
    compact: boolean,
    showTooltips: boolean,
    crosshair?: boolean,
    chart: HighstockChart,
    hasInterval: boolean,
    hideIntervalPicker: boolean,
    pickerShown: string,
    theme: string,
    getChart: () => any,
    getXAxis: () => any,
    getYAxis: () => any,
    onShowPicker: (picker: any) => void,
    onIntervalChange: (interval: string) => void,
    onTypeChange: (chartType: string) => void,
};

export default class Toolbar extends PureComponent {

    props: Props;

    static defaultProps = {
        type: 'area',
        compact: false,
        hasInterval: false,
        hideIntervalPicker: false,
    };

    render() {
        const { assetName, compact, type, getChart, pickerShown, interval, showTooltips,
            onShowPicker, onIntervalChange, onTypeChange, hideIntervalPicker } = this.props;
        const tooltips = showTooltips ? defaultTooltips : {};

        return (
            <div style={styles.toolbar} className="binary-chart-toolbar">
                <TypePicker
                    value={type}
                    tooltip={tooltips.type}
                    expanded={pickerShown === 'type'}
                    onExpand={() => onShowPicker('type')}
                    onChange={onTypeChange}
                />
                {(!compact && !hideIntervalPicker) &&
                    <IntervalPicker
                        value={interval}
                        tooltip={tooltips.interval}
                        expanded={pickerShown === 'interval'}
                        onExpand={() => onShowPicker('interval')}
                        onChange={onIntervalChange}
                    />
                }
                {/* <CrosshairSwitcher
                    tooltip={tooltips.crosshair}
                    getXAxis={getXAxis}
                    getYAxis={getYAxis}
                /> */}
                {/* {!compact &&
                    <IndicatorsPicker
                        tooltip={tooltips.indicators}
                        expanded={pickerShown === 'indicators'}
                        onExpand={() => onShowPicker('indicators')}
                    />
                } */}
                <SharePicker
                    assetName={assetName}
                    tooltip={tooltips.share}
                    expanded={pickerShown === 'share'}
                    onExpand={() => onShowPicker('share')}
                    getChart={getChart}
                />
                {/* {!compact &&
                    <SettingsPicker
                    tooltip={tooltips.settings}
                    />} */}
            </div>
        );
    }
}
