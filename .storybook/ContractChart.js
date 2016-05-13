import React, { PropTypes } from 'react';
import BinaryChart from '../src/BinaryChart';
import api from './ApiSingleton';

const token = 'qdJ86Avvrsh0Le4';

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
            api.getDataForContract(contractId)
        ).then(ticks => {
            this.setState({ ticks });
        });
    }

    render() {
        const { ticks, contract } = this.state;
        const { contractId } = this.props;
        const getDataWhenChange = (count, type) =>
            api.getDataForContract(contractId, type, count).then(newTicks => this.setState({ ticks: newTicks }));
        return (
            <BinaryChart ticks={ticks} contract={contract} rangeChange={getDataWhenChange} />
        );
    }
}
