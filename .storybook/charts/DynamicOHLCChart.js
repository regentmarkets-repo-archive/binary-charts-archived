import React from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';
import { LiveEvents } from 'binary-live-api';

export default class DynamicOHLCChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
        };
    }

    componentDidMount() {
        api.events.on('ohlc', response => {
            const { ticks } = this.state;
            const newTick = response.ohlc;
            this.setState({ ticks: ticks.concat([newTick]) });
            this.forceUpdate();
        });
        api
            .getCandles('R_100', { subscribe: 1, end: 'latest', count: 100 })
            .then(r => this.setState({ ticks: r.candles }));
    }

    componentWillUnmount() {
        api.events = new LiveEvents();
    }

    render() {
        const { ticks } = this.state;
        return (
            <BinaryChart type="candlestick" ticks={ticks} />
        );
    }
}
