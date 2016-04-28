import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import { LiveApi } from 'binary-live-api';

const token = 'qdJ86Avvrsh0Le4'
const api = new LiveApi();

class DynamicChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
        };
    }

    componentWillMount() {
        api.authorize(token).then(() => {
            return api.getStatement({ description: 1, limit: 1 });
        }).then(r => {
            const contractID = r.statement.transactions[0].contract_id;
            return api.subscribeToOpenContract(contractID);
        }).then(r => {
            const contract = r.proposal_open_contract;
            const symbol = contract.underlying;
            const purchaseT = contract.purchase_time;
            const sellT = contract.sell_time;
            this.setState({ contract });
            return api.getTickHistory(symbol, { start: purchaseT, end: sellT, adjust_start_time: 1 });
        }).then(r => {
            const ticks = r.history.times.map((t, idx) => {
                const quote = r.history.prices[idx];
                return { epoch: +t, quote: +quote };
            });
            this.setState({ ticks });
        })
    }

    render() {
        const { ticks, contract } = this.state;
        return (
            <BinaryChart ticks={ticks} contract={contract} />
        )
    }
}

storiesOf('Data retrieval', module)
    .add('rise fall', () => {
        return <DynamicChart />
    });
