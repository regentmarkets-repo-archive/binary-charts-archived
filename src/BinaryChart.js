import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import noDataToDisplay from 'highcharts/modules/no-data-to-display';

import Toolbar from './toolbar/Toolbar';
import TimeFramePicker from './toolbar/TimeFramePicker';
import ZoomControls from './toolbar/ZoomControls';

import initChart from './config/initChart';
import updateChart from './config/updateChart';

import axisIndicators from './plugins/axisIndicators';
import addLoadingFlag from './plugins/addLoadingFlag';

import chartTypeToDataType from './utils/chartTypeToDataType';
import getMainSeries from './utils/getMainSeries';
// import winLossIndicators from './plugins/winLossIndicators';
// import tradeMarker from './plugins/tradeMarker';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    exporting(Highcharts);
    noDataToDisplay(Highcharts);
    axisIndicators();
    addLoadingFlag();
//    winLossIndicators();
//    tradeMarker();
}

export type ChartEvent = {
    type: string,
    handler: () => void,
}

type ChartType = 'area' | 'line' | 'candlestick' | 'ohlc';

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
    symbol: string,
    shiftMode: 'fixed' | 'dynamic', // switch to decide how chart move when data added
    ticks: Tick[],
    theme: string,
    trade: TradeParam,
    tradingTimes: TradingTimes,
    toolbar: boolean,
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
        getData: () => ({}),
        onTypeChange: () => ({}),
        onIntervalChange: () => ({}),
        theme: 'light',
        ticks: [],
        pipSize: 0,
        type: 'area',
        toolbar: true,
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            range: {},
        };
    }

    componentDidMount() {
        this.createChart();
        updateChart(this.chart, { ticks: [] }, this.props);
    }

    shouldComponentUpdate(nextProps: Props) {
        if (this.props.symbol !== nextProps.symbol ||
                this.props.noData !== nextProps.noData) {
            this.destroyChart();
            this.createChart(nextProps);
        }

        if (this.props.type !== nextProps.type &&
            nextProps.type === 'candlestick' || nextProps.type === 'ohlc') {
            this.chart.xAxis[0].update({
                minRange: 10 * 60 * 1000,
            });
        }

        updateChart(this.chart, this.props, nextProps);

        return true;
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    createChart(newProps?: Props) {
        const props = newProps || this.props;
        const config = initChart(props);
        this.chart = new Highcharts.StockChart(this.chartDiv, config, chart => {
            if (!props.noData && props.ticks.length === 0) {
                chart.showLoading();
            }
        });

        this.eventListeners = props.events.map(e => ({
            type: e.type,
            handler: (ev) =>
                e.handler(ev, this.chart),
        }));

        this.eventListeners.forEach(e => this.chartDiv.addEventListener(e.type, e.handler));
    }

    destroyChart() {
        if (this.eventListeners) {
            this.eventListeners.forEach(e => {
                this.chartDiv.removeEventListener(e.type, e.handler);
            });
        }

        if (this.chart) {
            this.chart.destroy();
        }
    }

    getCurrentStartEnd = () => {
        const { dataMin, dataMax } = this.chart.xAxis[0].getExtremes();
        const start = Math.round(dataMin / 1000);
        const end = Math.round(dataMax / 1000);
        return { start, end };
    }

    onIntervalChange = (interval: Epoch) => {
        const { getData } = this.props;
        const { start, end } = this.getCurrentStartEnd();
        getData(start, end, 'candles', interval);
        this.interval = interval;
        this.chart.xAxis[0].update({
            minRange: 10 * interval * 1000,
        });
    };

    onTypeChange = (newType: string) => {
        const { getData, onTypeChange } = this.props;
        const { start, end } = this.getCurrentStartEnd();

        if (this.chart.isLoading) {                 // TODO: should disable change type control
            return;
        }

        const result = getData(start, end, chartTypeToDataType(newType), this.interval);
        onTypeChange(newType);
        if (result && result.then) {    // show loading msg if typechange function return promise
            this.chart.showLoading();
            result.then(() => this.chart.hideLoading());
        }
    };

    getChart = () => this.chart;

    getSeries = () => getMainSeries(this.chart);

    getXAxis = () => this.chart.xAxis[0];

    getYAxis = () => this.chart.yAxis[0];

    getDataForTimeFrame = (start, end) => {
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
        const { id, className, getData, toolbar, type } = this.props;
        const { pickerShown } = this.state;

        return (
            <div className={className} onClick={() => this.onShowPicker()}>
                {toolbar &&
                    <Toolbar
                        pickerShown={pickerShown}
                        hasInterval={chartTypeToDataType(type) === 'candles'}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getYAxis={this.getYAxis}
                        onIntervalChange={this.onIntervalChange}
                        onTypeChange={this.onTypeChange}
                        onShowPicker={this.onShowPicker}
                    />
                }
                <div ref={x => { this.chartDiv = x; }} id={id} />
                <ZoomControls
                    getXAxis={this.getXAxis}
                    getData={getData}
                    getSeries={this.getSeries}
                />
                {toolbar &&
                    <TimeFramePicker
                        getXAxis={this.getXAxis}
                        getData={this.getDataForTimeFrame}
                        getSeries={this.getSeries}
                    />
                }
            </div>
        );
    }
}
