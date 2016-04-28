import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './DynamicChart';
import { LiveApi } from 'binary-live-api';

const token = 'DKTDX5MnzTPTM43';
const api = new LiveApi();

const getData = (contractId) => {
    api.authorize(token).then(
        api.subscribeToOpenContract(contractId)
    ).then(r => {
        const contract = r.proposal_open_contract;
        const symbol = contract.underlying;
        this.setState({ contract });
        return api.getTickHistory(symbol, {
            start: contract.purchase_time,
            end: contract.sell_time,
            adjust_start_time: 1,
        });
    }).then(r => {
        const ticks = r.history.times.map((t, idx) => ({
            epoch: +t,
            quote: +r.history.prices[idx],
        }));
        this.setState({ ticks });
    });
};

storiesOf('Past Contracts', module)
    .add('1st', () =>
        <BinaryChart ticks={ticks} contract={contract} />
    );
