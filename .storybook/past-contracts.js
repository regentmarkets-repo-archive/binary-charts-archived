import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { LiveApi } from 'binary-live-api';
import BinaryChart from '../src/BinaryChart'

const token = 'DKTDX5MnzTPTM43';
const api = new LiveApi();


const getAllData = (contractID, style = 'ticks', granularity = 60) =>
    api.subscribeToOpenContract(contractID)
        .then(r => {
            const contract = r.proposal_open_contract;
            const symbol = contract.underlying;
            const purchaseT = contract.purchase_time;
            const sellT = contract.sell_time;
            return api.getTickHistory(symbol,
                {
                    start: purchaseT,
                    end: sellT,
                    adjust_start_time: 1,
                    style,
                    granularity,
                }
            );
        });

const hcUnitConverter = type => {
    switch (type) {
        case 'second': return 's';
        case 'minute': return 'm';
        case 'hour': return 'h';
        case 'day': return 'd';
        default: return 'd';
    }
};

/**
 * durationCount {Number}
 * durationType  {second|minute|day|ytd|year|all}      check http://api.highcharts.com/highstock#rangeSelector.buttons
 */
const getData = (contractID, durationCount, durationType, style = 'ticks', granularity = 60) =>
    api.subscribeToOpenContract(contractID)
        .then(r => {
            const contract = r.proposal_open_contract;
            const symbol = contract.underlying;
            const purchaseT = contract.purchase_time;
            const sellT = contract.sell_time;
            const end = contract.sell_spot ? sellT: nowEpoch();
            const durationUnit = hcUnitConverter(durationType);
            const start = Math.min(purchaseT, end - durationToSecs(durationCount, durationUnit));
            return api.getTickHistory(symbol,
                {
                    start,
                    end,
                    adjust_start_time: 1,
                    style,
                    granularity,
                }
            );
        });


class PastContractChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticks: [],
        };
    }

    componentWillMount() {
        const { style } = this.props
        api.authorize(token).then(() =>
            api.getStatement({ description: 1, limit: 1 })
        ).then(r =>
            getAllData(r.statement.transactions[0].contract_id, style)
        ).then(r => {
            const ticks = r.history.times.map((t, idx) => {
                const quote = r.history.prices[idx];
                return { epoch: +t, quote: +quote };
            });
            this.setState({ ticks });
        });
    }

    render() {
        const { ticks, contract } = this.state;
        return (
            <BinaryChart ticks={ticks} contract={contract} />
        );
    }
}

storiesOf('Past Contracts', module)
    .add('All data in ticks', () =>
        <PastContractChart />
    );
