import React, { Component } from 'react';
import ChartCore from './ChartCore';
import Toolbar from './toolbar/Toolbar';
import TimeFramePicker from './toolbar/TimeFramePicker';
import ZoomControls from './toolbar/ZoomControls';

import chartTypeToDataType from './utils/chartTypeToDataType';
import getMainSeries from './utils/getMainSeries';

import styles from './styles';

import type { ChartEvent } from './ChartCore';    // eslint-disable-line no-duplicate-imports

const intervalToDataType = interval => !interval ? 'ticks' : 'candles';

type Props = {
    assetName: string,
    allowOHLC: boolean,
    className?: string,
    contract: Contract,
    compactToolbar: boolean,
    events: ChartEvent[],
    getData?: (start: Epoch, end: Epoch, type: 'ticks' | 'candles', interval?: Epoch) => Promise,
    hideTimeFrame: boolean,
    hideIntervalPicker: boolean,
    hideToolbar: boolean,
    hideZoomControls: boolean,
    highContrast: boolean,
    id: string,
    // indicators: IndicatorsConfig[],
    showTooltips: boolean,
    noData: boolean,
    onTypeChange: (chartType: string) => void,
    pipSize: number,
    showAllTimeFrame: boolean,
    symbol: string,
    shiftMode: 'fixed' | 'dynamic', // switch to decide how chart move when data added
    ticks: Tick[],
    theme: string,
    trade: TradeParam,
    tradingTimes: TradingTimes,
    type: ChartType,
    interval: ?number, // Initial interval matching the initial data
};

type State = {
    pickerShown: any,
    endButtonShown: boolean,
    range: { from: Date, to: Date },
    interval: ?number,
}

export default class BinaryChart extends Component {

    props: Props;
    state: State;
    chartDiv: any;
    chart: Chart;

    static defaultProps = {
        allowOHLC: true,
        events: [],
        getData: () => Promise.resolve(),
        hideTimeFrame: false,
        hideIntervalPicker: false,
        hideToolbar: false,
        hideZoomControls: false,
        highContrast: false,
        indicators: [],
        onTypeChange: () => undefined,
        pipSize: 0,
        showAllTimeFrame: true,
        theme: 'light',
        ticks: [],
        type: 'area',
    };

    constructor(props: Props) {
        const interval = !isNaN(+props.interval) ?
            +props.interval : undefined;

        super(props);
        this.state = {
            range: {},
            endButtonShown: true,
            interval,
            indicators: [],
        };
    }

    getCurrentStartEnd = () => {
        const { dataMin, dataMax } = this.getXAxis().getExtremes();
        const start = Math.round(dataMin / 1000);
        const end = Math.round(dataMax / 1000);
        return { start, end };
    };

    onTypeChange = (newType: string) => {
        const { getData, onTypeChange, type } = this.props;
        const { start, end } = this.getCurrentStartEnd();

        if (this.chart.isLoading) {
            return;
        }

        const oldDataType = chartTypeToDataType(type);
        const newDataType = chartTypeToDataType(newType);

        if (oldDataType === newDataType) {
            onTypeChange(newType);
            return;
        }

        const newInterval = newDataType === 'ticks' ? undefined : 60;

        this.chart.showLoading();

        getData(start, end, newDataType, newInterval).then(() => {
            onTypeChange(newType);
            this.setState({ interval: newInterval });
            this.chart.hideLoading();
        });
    };

    onIntervalChange = (interval: Epoch) => {
        const { getData, type, onTypeChange } = this.props;
        const { start, end } = this.getCurrentStartEnd();
        const chartDataType = chartTypeToDataType(type);

        this.chart.showLoading();

        getData(start, end, intervalToDataType(interval), interval)
            .then(() => {
                this.setState({ interval });
                if (intervalToDataType(interval) === 'ticks') {
                    if (chartDataType !== 'ticks') {
                        onTypeChange('area');
                    }
                } else {
                    this.chart.xAxis[0].update({
                        minRange: 10 * interval * 1000,
                    });
                }
                this.chart.hideLoading();
            });
    };

    onIndicatorChange = (indicatorNames: string[]) => {
        const configs = indicatorNames.map(n => {
            switch (n) {
                case 'sma':
                case 'ema':
                    return { class: n, periods: 10 };
                case 'bb':
                    return { class: n, periods: 10, type: 'SMA', stdDevUp: 5, stdDevDown: 5 };
                default:
                    return {};
            }
        });
        this.setState({ indicators: configs });
    };

    getChart = () => this.chart;

    getSeries = () => getMainSeries(this.chart);

    getXAxis = () => this.chart.xAxis[0];

    getYAxis = () => this.chart.yAxis[0];

    getDataByStartEnd = (start, end) =>
        this.props.getData(start, end,
            intervalToDataType(this.state.interval), this.state.interval);

    onShowPicker = (picker: any) => {
        if (picker === this.state.pickerShown) {
            this.setState({ pickerShown: undefined });
        } else {
            this.setState({ pickerShown: picker });
        }
    }

    render() {
        const { allowOHLC, assetName, className, compactToolbar, hideTimeFrame, hideToolbar,
            showTooltips, hideZoomControls, showAllTimeFrame, theme, ticks, type, highContrast,
            id, symbol, noData, pipSize, events, shiftMode, contract, trade, hideIntervalPicker,
        } = this.props;

        const { endButtonShown, pickerShown, indicators, interval } = this.state;

        return (
            <div style={styles.container} className={className} onClick={this.onShowPicker}>
                <div className="binary-chart-info-container" style={styles.infobar} />
                {!hideToolbar &&
                    <Toolbar
                        allowOHLC={allowOHLC}
                        assetName={assetName}
                        compact={compactToolbar}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getYAxis={this.getYAxis}
                        hideIntervalPicker={hideIntervalPicker}
                        interval={interval}
                        onIntervalChange={this.onIntervalChange}
                        onTypeChange={this.onTypeChange}
                        onShowPicker={this.onShowPicker}
                        onIndicatorChange={this.onIndicatorChange}
                        pickerShown={pickerShown}
                        showTooltips={showTooltips}
                        theme={theme}
                        type={type}
                    />
                }
                <ChartCore
                    assetName={assetName}
                    parent={this}
                    highContrast={highContrast}
                    id={id}
                    indicators={indicators}
                    contract={contract}
                    symbol={symbol}
                    noData={noData}
                    pipSize={pipSize}
                    type={type}
                    dataType={intervalToDataType(interval)}
                    ticks={ticks}
                    events={events}
                    theme={theme}
                    trade={trade}
                    shiftMode={shiftMode}
                />
                {!hideZoomControls &&
                    <ZoomControls
                        endButtonShown={endButtonShown}
                        showTooltips={showTooltips}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getData={this.getDataByStartEnd}
                        getSeries={this.getSeries}
                    />
                }
                {!hideTimeFrame &&
                    <TimeFramePicker
                        data={ticks}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getData={this.getDataByStartEnd}
                        getSeries={this.getSeries}
                        interval={interval}
                        showAllTimeFrame={showAllTimeFrame}
                    />
                }
            </div>
        );
    }
}
