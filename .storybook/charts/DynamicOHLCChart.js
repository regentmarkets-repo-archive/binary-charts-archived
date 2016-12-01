import React from 'react';
import { LiveEvents } from 'binary-live-api';
import chartTypeToDataType from '../../src/utils/chartTypeToDataType';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

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

            if (type === 'line' || type === 'area' || ticks.length < 3) {
                return;
            }

            const newTick = response.ohlc;

            const lastTick = ticks[ticks.length - 1];

            const last2 = ticks[ticks.length - 2];
            const last3 = ticks[ticks.length - 3];

            const interval = last2.epoch - last3.epoch;
            const diff = newTick.epoch - lastTick.epoch;

            if (diff < interval) {
                newTick.epoch = lastTick.epoch;
                const nt = ticks.slice(0, -1);
                nt.push(newTick);
                this.setState({ ticks: nt });
            } else {
                this.setState({ ticks: ticks.concat([newTick]) });
            }
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
        const style = chartTypeToDataType(type);
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
