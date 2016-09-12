import React, { Component } from 'react';
import ChartCore from './ChartCore';
import Toolbar from './toolbar/Toolbar';
import TimeFramePicker from './toolbar/TimeFramePicker';
import ZoomControls from './toolbar/ZoomControls';

import chartTypeToDataType from './utils/chartTypeToDataType';
import getMainSeries from './utils/getMainSeries';

export type ChartEvent = {
    type: string,
    handler: () => void,
}

type Props = {
    className?: string,
    contract: Contract,
    events: ChartEvent[],
    id: string,
    getData?: (start: Epoch, end: Epoch, type: 'ticks' | 'candles', interval?: Epoch) => any,
    noData: boolean,
    onTypeChange: (chartType: string) => void,
    onRangeChange: () => void,
    onIntervalChange: (interval: ChartInterval) => void,
    pipSize: number,
    showAllTimeFrame: boolean,
    symbol: string,
    symbolName: string,
    shiftMode: 'fixed' | 'dynamic', // switch to decide how chart move when data added
    ticks: Tick[],
    theme: string,
    trade: TradeParam,
    tradingTimes: TradingTimes,
    hiddenTimeFrame: boolean,
    hiddenToolbar: boolean,
    compactToolbar: boolean,
    hiddenZoomControls: boolean,
    type: ChartType,
};

type State = {
    pickerShown: any,
    range: { from: Date, to: Date },
}

export default class BinaryChart extends Component {

    props: Props;
    state: State;

    chartDiv: any;
    chart: Chart;
    eventListeners: Object[];

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
        };
    }

    getCurrentStartEnd = () => {
        const { dataMin, dataMax } = this.chart.xAxis[0].getExtremes();
        const start = Math.round(dataMin / 1000);
        const end = Math.round(dataMax / 1000);
        return { start, end };
    }

    onIntervalChange = (interval: number) => {
        const { getData } = this.props;
        const { start, end } = this.getCurrentStartEnd();
        getData(start, end, 'candles', interval);
        this.interval = interval;
        this.getXAxis().update({
            minRange: 10 * interval * 1000,
        });
    };

    onTypeChange = (newType: string) => {
        const { getData, onTypeChange } = this.props;
        const { start, end } = this.getCurrentStartEnd();

        if (this.chart.isLoading) { // TODO: should disable change type control
            return;
        }

        const result = getData(start, end, chartTypeToDataType(newType), this.interval);
        onTypeChange(newType);
        if (result && result.then) {    // show loading msg if fetch data function return promise
            this.chart.showLoading();
            result.then(() => this.chart.hideLoading());
        }
    };

    getChart = () => this.chart;

    getSeries = () => getMainSeries(this.chart);

    getXAxis = () => this.chart.xAxis[0];

    getYAxis = () => this.chart.yAxis[0];

    getDataByStartEnd = (start, end) => {
        const type = chartTypeToDataType(this.props.type);
        const interval = this.interval;

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
        const { className, showAllTimeFrame, symbolName, ticks, type,
            hiddenTimeFrame, hiddenToolbar, hiddenZoomControls, compactToolbar } = this.props;
        const { pickerShown } = this.state;

        return (
            <div className={className} onClick={() => this.onShowPicker()}>
                {!hiddenToolbar &&
                    <Toolbar
                        symbolName={symbolName}
                        pickerShown={pickerShown}
                        compact={compactToolbar}
                        interval={this.interval}
                        hasInterval={chartTypeToDataType(type) === 'candles'}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getYAxis={this.getYAxis}
                        onIntervalChange={this.onIntervalChange}
                        onTypeChange={this.onTypeChange}
                        onShowPicker={this.onShowPicker}
                    />
                }
                <ChartCore parent={this} {...this.props} />
                {!hiddenZoomControls &&
                    <ZoomControls
                        getXAxis={this.getXAxis}
                        getData={this.getDataByStartEnd}
                        getSeries={this.getSeries}
                    />
                }
                {!hiddenTimeFrame &&
                    <TimeFramePicker
                        showAllTimeFrame={showAllTimeFrame}
                        data={ticks}
                        getXAxis={this.getXAxis}
                        getData={this.getDataByStartEnd}
                        getSeries={this.getSeries}
                    />
                }
            </div>
        );
    }
}
