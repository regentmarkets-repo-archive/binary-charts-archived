import React from 'react';
import BinaryChart from '../src/BinaryChart';
import api from './ApiSingleton';
import { convertEpochToMS } from './ohlc';

export default class TypeSwitchChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
            type: 'ticks',
        };
    }

    changeType(type) {
        switch (type) {
            case 'ticks':
                api.getTickHistory('R_100').then(r => {
                    const ticks = r.history.times.map((t, idx) => {
                        const quote = r.history.prices[idx];
                        return { epoch: +t, quote: +quote };
                    });
                    this.setState({ ticks, type: 'area' });
                });
                break;
            case 'candles': api.getCandles('R_100').then(r => {
                this.setState({
                    type: 'candles',
                    ticks: convertEpochToMS(r.candles),
                });
            });
                break;
            default: return;
        }
    }

    render() {
        const { ticks, type } = this.state;
        return (
            <BinaryChart type={type} ticks={ticks} typeChange={t => this.changeType(t)} />
        );
    }
}
