import React from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';
import { LiveEvents } from 'binary-live-api';

export default class DynamicOHLCChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
            type: 'candlestick',
        };
    }

    componentDidMount() {
        api.events.on('ohlc', response => {
            const { ticks, type } = this.state;

            if (type === 'line' || type === 'area') {
                return;
            }

            const newTick = response.ohlc;
            this.setState({ ticks: ticks.concat([newTick]) });
        });

        api.events.on('tick', response => {
            const { ticks, type } = this.state;

            if (type === 'ohlc' || type === 'candlestick') {
                return;
            }

            const newTick = response.tick;
            this.setState({ ticks: ticks.concat([{ epoch: +newTick.epoch, quote: +newTick.quote }]) });
        });

        api
            .getCandles('R_100', { subscribe: 1, end: 'latest', count: 100 })
            .then(r => this.setState({ ticks: r.candles }));
    }

    componentWillUnmount() {
        api.events = new LiveEvents();
    }

    changeType(type: string): Promise<*> {
        const style = (type === 'candlestick' || type === 'ohlc') ? 'candles' : 'ticks';
        return api.getTickHistory('R_100', { subscribe: 1, end: 'latest', count: 100, style })
        .then(r => {
            let data;
            if (style === 'ticks') {
                const { times, prices } = r.history;
                data = times.map((t, idx) => ({
                    epoch: +t,
                    quote: +prices[idx],
                }));
            } else {
                data = r.candles;
            }

            const update = { type, ticks: data };
            this.setState(update);
        });
    }

    render() {
        const { ticks, type } = this.state;
        return (
            <BinaryChart
                type={type}
                ticks={ticks}
                onTypeChange={t => this.changeType(t)}
            />
        );
    }
}
