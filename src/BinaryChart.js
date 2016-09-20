import React, { Component } from 'react';
import { getLast } from 'binary-utils';
import ChartCore from './ChartCore';
import Toolbar from './toolbar/Toolbar';
import TimeFramePicker from './toolbar/TimeFramePicker';
import ZoomControls from './toolbar/ZoomControls';

import chartTypeToDataType from './utils/chartTypeToDataType';
import getMainSeries from './utils/getMainSeries';

import styles from './styles';

export type ChartEvent = {
    type: string,
    handler: () => void,
}

type Props = {
    assetName: string,
    className?: string,
    contract: Contract,
    compactToolbar: boolean,
    events: ChartEvent[],
    id: string,
    getData?: (start: Epoch, end: Epoch, type: 'ticks' | 'candles', interval?: Epoch) => Promise,
    hiddenTimeFrame: boolean,
    hiddenToolbar: boolean,
    hiddenZoomControls: boolean,
    noData: boolean,
    onTypeChange: (chartType: string) => void,
    onRangeChange: () => void,
    onIntervalChange: (interval: ChartInterval) => void,
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
        events: [],
        getData: () => Promise.resolve(),
        onTypeChange: () => undefined,
        onIntervalChange: () => undefined,
        showAllTimeFrame: true,
        theme: 'light',
        ticks: [],
        pipSize: 0,
        type: 'area',
        hideTimeFrame: false,
        hideToolbar: false,
        hideZoomControls: false,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            range: {},
            endButtonShown: true,
            interval: undefined,
        };
    }

    getCurrentStartEnd = () => {
        const { dataMin, dataMax } = this.getXAxis().getExtremes();
        const start = Math.round(dataMin / 1000);
        const end = Math.round(dataMax / 1000);
        return { start, end };
    };

    onTypeChange = (newType: string) => {
        const { getData, onTypeChange } = this.props;
        const { start, end } = this.getCurrentStartEnd();

        if (this.chart.isLoading) {
            return;
        }

        const dataType = chartTypeToDataType(newType);

        const newInterval = dataType === 'ticks' ? undefined : 60;

        this.setState({ interval: newInterval });

        this.chart.showLoading();

        getData(start, end, dataType, newInterval).then(data => {
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
                    onTypeChange('candlestick');
                    this.chart.xAxis[0].update({
                        minRange: 10 * interval * 1000,
                    });
                });
        }
        this.setState({ interval });
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
        const { assetName, className, compactToolbar, hiddenTimeFrame, hiddenToolbar,
            hiddenZoomControls, showAllTimeFrame, theme, ticks, type } = this.props;

        const { endButtonShown, pickerShown, interval } = this.state;

        return (
            <div style={styles.container} className={className} onClick={this.onShowPicker}>
                {!hiddenToolbar &&
                    <Toolbar
                        assetName={assetName}
                        compact={compactToolbar}
                        interval={interval}
                        hasInterval={chartTypeToDataType(type) === 'candles'}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getYAxis={this.getYAxis}
                        onIntervalChange={this.onIntervalChange}
                        onTypeChange={this.onTypeChange}
                        onShowPicker={this.onShowPicker}
                        pickerShown={pickerShown}
                        theme={theme}
                        type={type}
                    />
                }
                <ChartCore parent={this} {...this.props} />
                {!hiddenZoomControls &&
                    <ZoomControls
                        endButtonShown={endButtonShown}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getData={this.getDataByStartEnd}
                        getSeries={this.getSeries}
                    />
                }
                {!hiddenTimeFrame &&
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
