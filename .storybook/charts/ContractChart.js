import React, { PropTypes } from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

const token = 'qdJ86Avvrsh0Le4';

const getContract = contractID => api.getContractInfo(contractID).then(r => r.proposal_open_contract);

const callTrade = {
    barrier: '30000',
    barrierType: 'absolute',
    contract_type: 'CALL'
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
    contract_type: 'EXPIRYMISS'
};

const tickTrade = {
    barrierType: 'digit',
    barrier: 8,
    contract_type: 'DIGITMATCH',
    tick_count: 10,
}

export default class ContractChart extends React.Component {

    static propTypes = {
        contractId: PropTypes.string,
    };

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
            }), 1, 'all')
        ).then(ticks => {
            this.setState({ ticks });
        });
    }

    render() {
        const { ticks, contract } = this.state;
        const { contractId } = this.props;
        const getDataWhenChange = (count, type) =>
            api
                .getDataForContract(() => getContract(contractId), count, type)
                .then(newTicks => {
                    if (contract) {
                        this.setState({ ticks: newTicks, contract });
                    } else {
                        this.setState({ ticks: newTicks });
                    }
                });

        if (contract) {
            // contract.date_start = Math.round(new Date().getTime() / 1000) + 500;
            // delete contract.barrier;
            contract.tick_count = 10;
        }
        return (
            <BinaryChart
                id="halo"
                ticks={ticks}
                contract={contract}
                rangeChange={getDataWhenChange}
                pipSize={2}
            />
        );
    }
}
