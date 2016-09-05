import React from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

const token = 'qdJ86Avvrsh0Le4';
const getContract = contractID => api.getContractInfo(contractID).then(r => r.proposal_open_contract);
const contractId = 8964601848;

export default class TypeSwitchChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
            type: 'area',
        };
    }

    componentDidMount() {
        api.authorize(token).then(() =>
            api.getDataForContract(() => getContract(contractId), 1, 'all')
        ).then(r => {
            this.setState({ type: 'area', ticks: r.ticks });
        });
    }

    changeType(type: string): Promise<*> {
        const candles = type === 'candlestick' || type === 'ohlc' ? 'candles' : undefined;
        return api.authorize(token).then(() =>
            api.getDataForContract(() => getContract(contractId), 1, 'all', candles)
        ).then(r => {
            this.setState({ type, ticks: r.ticks });
        });
    }

    render() {
        const { ticks, type } = this.state;
        return (
            <BinaryChart
                type={type}
                ticks={ticks}
                onTypeChange={t => this.changeType(t)} pipSize={2}
            />
        );
    }
}
