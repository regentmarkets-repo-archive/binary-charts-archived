import React, { Component } from 'react';
// $FlowFixMe
import Highcharts from './highcharts/highstock';
// $FlowFixMe
import exporting from './highcharts/modules/exporting';
// $FlowFixMe
import noDataToDisplay from './highcharts/modules/no-data-to-display';
import * as BinaryTypes from './BinaryTypes';
import initChart from './config/initChart';
import updateChart from './config/updateChart';

import axisIndicators from './plugins/axisIndicators';
// import winLossIndicators from './plugins/winLossIndicators';
import addLoadingFlag from './plugins/addLoadingFlag';
// import tradeMarker from './plugins/tradeMarker';

// workaround for tests to work
if (Object.keys(Highcharts).length > 0) {
    exporting(Highcharts);
    noDataToDisplay(Highcharts);
    axisIndicators();
//    winLossIndicators();
    addLoadingFlag();
//    tradeMarker();
}

type Props = {
    className?: string,
    contract: Contract,
    defaultRange: number,
    showAllRangeSelector: boolean,
    events: BinaryTypes.events,
    height: number,
    id: string,
    noData: boolean,
    pipSize: number,
    rangeChange: () => void,
    symbol: string,
    ticks: Tick[],
    theme: string,
    trade: TradeParam,
    tradingTimes: TradingTimes,
    type: 'area' | 'candlestick',
    typeChange: () => void,
    width: number,
};

export default class BinaryChart extends Component {

    props: Props;
    chartDiv: any;
    chart: Chart;
    eventListeners: Object[];

    static defaultProps = {
        defaultRange: 5,
        events: [],
        theme: 'light',
        ticks: [],
        pipSize: 0,
        type: 'area',
        noData: false,
    };

    componentDidMount() {
        this.createChart();
        updateChart(this.chart, { ticks: [] }, this.props);
    }

    shouldComponentUpdate(nextProps: Props) {
        if (this.props.symbol !== nextProps.symbol ||
                this.props.type !== nextProps.type ||
                this.props.noData !== nextProps.noData) {
            this.destroyChart();
            this.createChart(nextProps);
        }

        updateChart(this.chart, this.props, nextProps);

        return false;
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
        if (props.type === 'candlestick') {
            this.chart.xAxis[0].update({
                minRange: 10 * 60 * 1000,
            });
        }

        const self = this.chart;
        this.eventListeners = props.events.map(e => {
            function handler(ev) {
                e.handler(ev, self);
            }
            return { type: e.type, handler };
        });
        this.eventListeners.forEach(e => this.chartDiv.addEventListener(e.type, e.handler));
    }

    destroyChart() {
        this.eventListeners.forEach(e => {
            this.chartDiv.removeEventListener(e.type, e.handler);
        });
        this.chart.destroy();
    }

    render() {
        const { id, className } = this.props;
        return (
            <div ref={x => { this.chartDiv = x; }} id={id} className={className} />
        );
    }
}
