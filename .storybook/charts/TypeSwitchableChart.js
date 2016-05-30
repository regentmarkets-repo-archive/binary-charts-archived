import React from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';
import { convertEpochToMS } from '../ohlc';

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

    changeType(type) {
        switch (type) {
            case 'area':
                api.authorize(token).then(() =>
                    api.getDataForContract(() => getContract(contractId), 1, 'all')
                ).then(ticks => {
                    this.setState({ type, ticks });
                });
                break;
            case 'candlestick':
                api.authorize(token).then(() =>
                    api.getDataForContract(() => getContract(contractId), 1, 'all', 'candles')
                ).then(ticks => {
                    this.setState({ type, ticks });
                });
                break;
            default: return;
        }
    }

    render() {
        const { ticks, type } = this.state;
        return (
            <BinaryChart type={type} ticks={ticks} typeChange={t => this.changeType(t)} pipSize={2} />
        );
    }
}
