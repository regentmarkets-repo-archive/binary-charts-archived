import React, { Component } from 'react';
import { getLast } from 'binary-utils';
import ChartCore from './ChartCore';
import Toolbar from './toolbar/Toolbar';
import TimeFramePicker from './toolbar/TimeFramePicker';
import ZoomControls from './toolbar/ZoomControls';

import chartTypeToDataType from './utils/chartTypeToDataType';
import getMainSeries from './utils/getMainSeries';

import styles from './styles';

import type { ChartEvent } from './ChartCore';    // eslint-disable-line no-duplicate-imports

import { yAxis as rsiYAxis } from './config/IndicatorsWithYAxis/Rsi';

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
        super(props);
        this.state = {
            range: {},
            endButtonShown: true,
            interval: undefined,
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

        this.setState({ interval: newInterval });

        this.chart.showLoading();

        getData(start, end, newDataType, newInterval).then(data => {
            onTypeChange(newType);

            this.chart.hideLoading();

            if (!data || data.length === 0) {
                return;
            }

            const xAxis = this.getXAxis();
            const { min, max } = xAxis.getExtremes();
            const newMin = Math.max(min, data[0].epoch * 1000);
            const newMax = Math.min(max, getLast(data).epoch * 1000);
            xAxis.setExtremes(newMin, newMax, true, false);
        });
    };

    onIntervalChange = (interval: Epoch) => {
        const { getData, type, onTypeChange } = this.props;
        const { start, end } = this.getCurrentStartEnd();

        const dataType = chartTypeToDataType(type);

        if (!interval) {
            if (dataType !== 'ticks') {
                getData(start, end, 'ticks')
                    .then(() => onTypeChange('area'));
            }
        } else {
            getData(start, end, 'candles', interval)
                .then(() => {
                    if (dataType === 'ticks') {
                        onTypeChange('candlestick');        // only change when original data type is ticks, ie. Area or Line chart
                    }

                    this.chart.xAxis[0].update({
                        minRange: 10 * interval * 1000,
                    });
                });
        }
        this.setState({ interval });
    };

    onIndicatorChange = (indicatorNames: string[]) => {
        const configs = indicatorNames.map(n => {
            switch (n) {
                case 'sma':
                case 'ema':
                    return { class: n, periods: 10 };
                case 'rsi':
                    return { class: n, periods: 14, yAxis: rsiYAxis };
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

    getDataByStartEnd = (start, end) => {
        const type = chartTypeToDataType(this.props.type);
        const interval = this.state.interval;

        if (type === 'candles') {
            return this.props.getData(start, end, type, interval);
        }
        return this.props.getData(start, end, type);
    }

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
