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
    api: LiveApi,
    className?: string,
    contract: Contract,
    showAllRangeSelector: boolean,
    events: ChartEvent[],
    height: number,
    id: string,
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
    width: number,
};

type State = {
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
        if (props.type === 'candlestick' || props.type === 'ohlc') {
            this.chart.xAxis[0].update({
                minRange: 10 * 60 * 1000,
            });
        }

        this.eventListeners = props.events.map(e => ({
            type: e.type,
            handler: (ev) =>
                e.handler(ev, this.chart),
        }));

        this.eventListeners.forEach(e => this.chartDiv.addEventListener(e.type, e.handler));
    }

    destroyChart() {
        // console.log(this, this.eventListeners);
        this.eventListeners.forEach(e => {
            this.chartDiv.removeEventListener(e.type, e.handler);
        });
        this.chart.destroy();
    }

    onRangeChange = (from: Date, to: Date) => {
        this.setState({ range: { from, to } });
    };

    onIntervalChange = (interval: number) => {
        const { onIntervalChange } = this.props;
        const { dataMin, dataMax } = this.chart.xAxis[0].getExtremes();
        if (onIntervalChange) onIntervalChange(interval, dataMax - dataMin);

        this.chart.get('main-ohlc').update({
            pointRange: interval * 1000,
            dataGrouping: {
                enabled: false,
            },
        }, true);
    };

    onTypeChange = (newType: string) => {
        const { onTypeChange } = this.props;

        if (this.chart.isLoading) {
            return;
        }

        const result = onTypeChange(newType);
        if (result && result.then) {    // show loading msg if typechange function return promise
            this.chart.showLoading();
            result.then(() => this.chart.hideLoading());
        }
    }

    getChart = () => this.chart;

    getXAxis = () => this.chart.xAxis[0];

    getYAxis = () => this.chart.yAxis[0];

    render() {
        const { id, className, toolbar, type } = this.props;

        return (
            <div className={className}>
                {toolbar &&
                    <Toolbar
                        hasInterval={chartTypeToDataType(type) === 'ohlc'}
                        getChart={this.getChart}
                        getXAxis={this.getXAxis}
                        getYAxis={this.getYAxis}
                        onIntervalChange={this.onIntervalChange}
                        onTypeChange={this.onTypeChange}
                    />
                }
                <div ref={x => { this.chartDiv = x; }} id={id} />
                <ZoomControls getXAxis={this.getXAxis} />
                {toolbar &&
                    <TimeFramePicker getXAxis={this.getXAxis} />
                }
            </div>
        );
    }
}
