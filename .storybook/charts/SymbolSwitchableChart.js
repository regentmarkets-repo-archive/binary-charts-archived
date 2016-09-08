import React from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

const token = 'qdJ86Avvrsh0Le4';

export default class SymbolSwitchableChart extends React.Component {

    props: {
        symbol: string,
    }

    constructor(props) {
        super(props);
        this.state = {
            symbol: 'R_100',
            ticks: [],
        };
    }

    componentDidMount() {
        const { symbol } = this.state;
        api.authorize(token).then(() =>
            api.getDataForSymbol(symbol, 10 * 60)
        ).then(r => {
            this.setState({ ticks: r.ticks });
        });
    }

    render() {
        const { ticks, symbol } = this.state;
        const getData = (symbol) => (start, end) => {
            const duration = Math.round((end - start) / 1000);
            return api.getTickHistory(symbol, {
                start,
                end,
            }).then(r => {
                const { times, prices } = r.history;
                const result = times.map((t, idx) => ({
                    epoch: +t,
                    quote: +prices[idx],
                }));
                this.setState({ ticks: result.concat(ticks) })
            });
        };
        // console.log('s', symbol);
        return (
            <div>
                <BinaryChart
                    ticks={ticks}
                    symbol={symbol}
                    getData={getData(symbol)}
                />
                <input type="radio" name="symbol" onChange={() => this.setState({ symbol: 'R_50' })} /> R_50
                <input type="radio" name="symbol" onChange={() => this.setState({ symbol: 'R_100' })} /> R_100
            </div>
        );
    }
}
