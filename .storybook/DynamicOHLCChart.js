import React from 'react';
import BinaryChart from '../src/BinaryChart';
import api from './ApiSingleton';
import { LiveEvents } from 'binary-live-api';
import { convertEpochToMS } from './ohlc';

export default class DynamicOHLCChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
        };
    }

    componentWillMount() {
        api.events.on('ohlc', response => {
            const { ticks } = this.state;
            const newTick = response.ohlc;
            this.setState({ ticks: ticks.concat([newTick]) });
        });
        api.getCandles('R_100', { subscribe: 1, end: 'latest', count: 10 });
    }

    componentWillUnmount() {
        api.events = new LiveEvents();
    }

    render() {
        const { ticks } = this.state;

        return (
            <BinaryChart type="candles" ticks={convertEpochToMS(ticks)} />
        );
    }
}
