import React from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

const token = 'qdJ86Avvrsh0Le4';

const getContract = contractID =>
    api.getContractInfo(contractID).then(r => r.proposal_open_contract);

const callTrade = {
    barrier: '30000',
    barrierType: 'absolute',
    contract_type: 'CALL',
};

const digitTrade = {
    barrierType: 'digit',
    barrier: 8,
    contract_type: 'DIGITMATCH',
};

const endsoutsideTrade = {
    barrier: '+70',
    barrier2: '-70',
    barrierType: 'relative',
    contract_type: 'EXPIRYMISS',
};

const tickTrade = {
    barrierType: 'digit',
    barrier: 8,
    contract_type: 'DIGITMATCH',
    tick_count: 10,
};

export default class ContractChart extends React.Component {

    props: {
        contractId: string,
    }

    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
        };
    }

    componentWillMount() {
        const { contractId } = this.props;
        api.authorize(token).then(() =>
            api.getDataForContract(() => getContract(contractId).then(c => {
                this.setState({ contract: c });
                return c;
            }))
        ).then(r => {
            this.setState({ ticks: r.ticks });
        });
    }

    render() {
        const { ticks, contract } = this.state;
        const { contractId } = this.props;
        const getDataWhenChange = (duration) =>
            api
                .getDataForContract(() => getContract(contractId), duration)
                .then(r => {
                    if (contract) {
                        this.setState({ ticks: r.ticks, contract });
                    } else {
                        this.setState({ ticks: r.ticks });
                    }
                });
        return (
            <BinaryChart
                ticks={ticks}
                contract={contract}
                pipSize={2}
                onRangeChange={getDataWhenChange}
            />
        );
    }
}
