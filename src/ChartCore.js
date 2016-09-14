import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from 'highcharts/modules/exporting';
import noDataToDisplay from 'highcharts/modules/no-data-to-display';

import initChart from './config/initChart';
import updateChart from './config/updateChart';

import axisIndicators from './plugins/axisIndicators';
import addLoadingFlag from './plugins/addLoadingFlag';

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

type Props = {
    parent: Object,
    id: string,
    symbol: string,
    noData: boolean,
    pipSize: number,
    type: ChartType,
    ticks: Tick[],
    events: ChartEvent[],
    theme: string,
    shiftMode: 'fixed' | 'dynamic', // switch to decide how chart move when data added
};

export default class ChartCore extends Component {

    props: Props;

    chartDiv: any;
    chart: Chart;
    eventListeners: Object[];

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

        return false;
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    createChart(newProps?: Props) {
        const props = newProps || this.props;
        const config = initChart(Object.assign({
            hideEndButton: (hide) => this.props.parent.setState({ endButtonShown: hide }),
        }, props));

        this.chart = this.props.parent.chart = new Highcharts.StockChart(this.chartDiv, config, (chart) => {
            if (!props.noData && props.ticks.length === 0) {
                chart.showLoading();
            }
        });

        this.eventListeners = props.events.map(e => ({
            type: e.type,
            handler: ev => e.handler(ev, this.chart),
        }));

        this.eventListeners.forEach(e => this.chartDiv.addEventListener(e.type, e.handler));
    }

    destroyChart() {
        if (this.eventListeners) {
            this.eventListeners.forEach(e => this.chartDiv.removeEventListener(e.type, e.handler));
        }

        if (this.chart) {
            this.chart.destroy();
        }
    }

    render() {
        const { id } = this.props;

        return (
            <div ref={x => { this.chartDiv = x; }} id={id} />
        );
    }
}
