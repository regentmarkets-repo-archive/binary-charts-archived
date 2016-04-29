import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { LiveApi } from 'binary-live-api';
import BinaryChart from '../src/BinaryChart'
import nowEpoch from 'binary-utils/lib/nowAsEpoch';
import durationToSecs from 'binary-utils/lib/durationToSecs';

const token = 'qdJ86Avvrsh0Le4';
const api = new LiveApi();

const contract5day = '8686428788';
const contract5min = '8686424368';

const getAllData = (contractID, style = 'ticks', granularity = 60) =>
    api.subscribeToOpenContract(contractID)
        .then(r => {
            const contract = r.proposal_open_contract;
            const symbol = contract.underlying;
            const purchaseT = contract.purchase_time;
            const sellT = contract.sell_time;
            const end = contract.sell_spot ? sellT: 'latest';
            return api.getTickHistory(symbol,
                {
                    start: purchaseT,
                    end,
                    adjust_start_time: 1,
                    count: 4999,
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
const getData = (contractID, durationType, durationCount, style = 'ticks', granularity = 60) =>
    api.subscribeToOpenContract(contractID)
        .then(r => {
            const contract = r.proposal_open_contract;
            const symbol = contract.underlying;
            const purchaseT = contract.purchase_time;
            const sellT = contract.sell_time;

            if (durationType === 'all') {
                return getAllData(contractID, style, granularity);
            }

            const end = contract.sell_spot ? sellT: nowEpoch();
            const durationUnit = hcUnitConverter(durationType);
            const start = Math.min(purchaseT, end - durationToSecs(durationCount, durationUnit));
            return api.getTickHistory(symbol,
                {
                    start,
                    end,
                    adjust_start_time: 1,
                    count: 4999,
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

    updateTicks(history) {
        const ticks = history.times.map((t, idx) => {
            const quote = history.prices[idx];
            return { epoch: +t, quote: +quote };
        });
        this.setState({ ticks });
    }

    componentWillMount() {
        const { style, contractID } = this.props
        api.authorize(token).then(r =>
            getAllData(contractID, style)
        ).then(r => {
            this.updateTicks(r.history);
        });
    }

    render() {
        const { ticks, contract } = this.state;
        const { contractID } = this.props;
        const getDataWhenChange = (count, type) =>
            getData(contractID, type, count).then(r => this.updateTicks(r.history));
        return (
            <BinaryChart ticks={ticks} contract={contract} rangeChange={getDataWhenChange} />
        );
    }
}

storiesOf('Past Contracts', module)
    .add('All data in ticks', () =>
        <PastContractChart contractID={contract5min}/>
    );
