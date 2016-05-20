import React, { PropTypes } from 'react';
import BinaryChart from '../../src/BinaryChart';
import api from '../ApiSingleton';

const token = 'qdJ86Avvrsh0Le4';

const getContract = contractID => api.getContractInfo(contractID).then(r => r.proposal_open_contract);

export default class ContractChart extends React.Component {

    static propTypes = {
        contractId: PropTypes.number,
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
            api.getDataForContract(() => getContract(contractId), count, type).then(newTicks => this.setState({ ticks: newTicks }));
        return (
            <BinaryChart ticks={ticks} contract={contract} rangeChange={getDataWhenChange} />
        );
    }
}
