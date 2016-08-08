import React, { PropTypes } from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

const token = 'qdJ86Avvrsh0Le4';

export default class SymbolSwitchableChart extends React.Component {

    static propTypes = {
        symbol: PropTypes.string,
    };

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
            api.getDataForSymbol(symbol, 1, 'all')
        ).then(r => {
            this.setState({ ticks: r.ticks });
        });
    }

    render() {
        const { ticks, symbol } = this.state;
        const getDataFor50 = (count, type) =>
            api.getDataForSymbol('R_50', count, type).then(r => this.setState({ ticks: r.ticks }));
        const getDataFor100 = (count, type) =>
            api.getDataForSymbol('R_100', count, type).then(r => this.setState({ ticks: r.ticks }));

        // console.log('s', symbol);
        return (
            <div>
                <BinaryChart
                    ticks={ticks}
                    symbol={symbol}
                    rangeChange={symbol === 'R_50' ? getDataFor50 : getDataFor100}
                />
                <input type="radio" name="symbol" onChange={() => this.setState({ symbol: 'R_50' })} /> R_50
                <input type="radio" name="symbol" onChange={() => this.setState({ symbol: 'R_100' })} /> R_100
            </div>
        );
    }
}
