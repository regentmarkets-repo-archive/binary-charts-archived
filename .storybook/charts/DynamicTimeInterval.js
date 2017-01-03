import React from 'react';
import { LiveEvents } from 'binary-live-api';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

const mapHistoryTicks = history => {
    const { times, prices } = history;
    return times.map((t, idx) => ({
        epoch: +t,
        quote: +prices[idx],
    }));
};

export default class DynamicOHLCChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
            type: 'line',
        };
    }

    componentDidMount() {
        api.events.on('ohlc', response => {
            const { ticks } = this.state;
            const newTick = response.ohlc;
            const lastCandle = ticks.slice(-1)[0];
            const getTime = candle => candle.open_time || candle.epoch;
            const newCandles = (getTime(lastCandle) === getTime(newTick)) ?
                [...ticks.slice(0, ticks.length - 1), newTick] :
                ticks.concat([newTick]);
            this.setState({ ticks: newCandles });
        });

        api.events.on('tick', response => {
            const { ticks } = this.state;
            const newTick = response.tick;
            this.setState({ ticks: ticks.concat([{ epoch: +newTick.epoch, quote: +newTick.quote }]) });
        });

        api
            .getTickHistory('R_100', { subscribe: 1, end: 'latest', count: 100 })
            .then(r => this.setState({ ticks: mapHistoryTicks(r.history) }));
    }

    componentWillUnmount() {
        api.events = new LiveEvents();
    }

    getData(start: Epoch, end: Epoch, style: 'ticks' | 'candles', granularity?: Epoch) {
        return new Promise((r, e) => {
            api.unsubscribeFromAllTicks().then(() => 0, () => 0);
            api.unsubscribeFromAllCandles().then(() => 0, () => 0);
            api.getTickHistory('R_100', { subscribe: 1, end: 'latest', count: 100, granularity, style })
                .then(resp => {
                    let ticks;
                    if (style === 'ticks') {
                        ticks = mapHistoryTicks(resp.history);
                    } else {
                        ticks = resp.candles;
                    }

                    this.setState({ ticks });
                    r(ticks);
                }, e);
        });
    }

    render() {
        const { ticks, type } = this.state;
        return (
            <BinaryChart
                type={type}
                ticks={ticks}
                getData={(...args) => this.getData(...args)}
                onTypeChange={t => this.setState({ type: t })}
            />
        );
    }
}
