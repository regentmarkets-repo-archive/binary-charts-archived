import React, { PureComponent } from 'react';
import Highcharts from 'highcharts/highstock.src';
import exporting from 'highcharts/modules/exporting';
import noDataToDisplay from 'highcharts/modules/no-data-to-display';

import initChart from './config/initChart';
import updateChart from './config/updateChart';

import axisIndicators from './plugins/axisIndicators';
import addLoadingFlag from './plugins/addLoadingFlag';

import styles from './styles';

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

export type IndicatorsConfig = {
    type: 'sma' | 'ema',
    period?: number,
}

export type ChartEvent = {
    type: string,
    handler: () => void,
}

type Props = {
    parent: Object,
    contract: Object,
    id: string,
    indicators: IndicatorsConfig[],
    symbol: string,
    noData: boolean,
    pipSize: number,
    type: ChartType,
    trade: Object,
    ticks: Tick[],
    events: ChartEvent[],
    theme: string,
    shiftMode: 'fixed' | 'dynamic', // switch to decide how chart move when data added
};

export default class ChartCore extends PureComponent {

    props: Props;

    chartDiv: any;
    chart: Chart;
    eventListeners: Object[];

    componentDidMount() {
        this.createChart();
        updateChart(this.chart, { ticks: [] }, this.props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.symbol !== prevProps.symbol ||
            this.props.noData !== prevProps.noData) {
            this.destroyChart();
            this.createChart(this.props);
        }

        updateChart(this.chart, prevProps, this.props);
    }

    componentWillUnmount() {
        this.destroyChart();
    }

    createChart(newProps?: Props) {
        const props = newProps || this.props;
        const config = initChart(Object.assign({
            hideEndButton: (hide) =>
                this.props.parent.setState({ endButtonShown: !hide }),
        }, props));

        this.chart = this.props.parent.chart =
            new Highcharts.StockChart(this.chartDiv, config, (chart) => {
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
            <div style={styles.chartCore} ref={x => { this.chartDiv = x; }} id={id} />
        );
    }
}
