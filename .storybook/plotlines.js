import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';

const sampleContract = {
    'entry_tick_time': '1462178048',
    'validation_error': 'This contract has been sold.',
    'ask_price': '0.00',
    'current_spot_time': '1462250144',
    'date_expiry': 1462178056,
    'payout': '450.45',
    'contract_type': 'DIGITMATCH',
    'bid_price': '0.00',
    'current_spot': '31971.68',
    'contract_id': '8720935448',
    'display_name': 'Volatility 100 Index',
    'shortcode': 'DIGITMATCH_R_100_450.45_1462178046_5T_0_0',
    'longcode': 'USD 450.45 payout if the last digit of Volatility 100 Index is 0 after 5 ticks.',
    'is_sold': 1,
    'entry_tick': '31982.44',
    'purchase_time': 1462178046,
    'tick_count': 5,
    'exit_tick_time': '1462178056',
    'entry_spot': '31982.44',
    'sell_spot': '32002.15',
    'is_forward_starting': 0,
    'is_expired': 1,
    'buy_price': '50',
    'currency': 'USD',
    'date_start': 1462178046,
    'is_intraday': 1,
    'transaction_ids': {
        'buy': '17291719208',
        'sell': '17291722688',
    },
    'barrier': 0,
    'date_settlement': 1462178056,
    'is_path_dependent': 0,
    'sell_time': 1462178058,
    'sell_price': '0.00',
    'sell_spot_time': '1462178058',
    'underlying': 'R_100',
    'exit_tick': '31994.69',
    'is_valid_to_sell': 0,
};

const sampleTicks = [
    {
        epoch: 1462178046,
        quote: 31978.82,
    },
    {
        epoch: 1462178048,
        quote: 31982.44,
    },
    {
        epoch: 1462178050,
        quote: 31990.26,
    },
    {
        epoch: 1462178052,
        quote: 31999.3,
    },
    {
        epoch: 1462178054,
        quote: 31991.26,
    },
    {
        epoch: 1462178056,
        quote: 31994.69,
    },
    {
        epoch: 1462178058,
        quote: 32002.15,
    },
];

class DynamicPlotLinesChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dynamicContract: sampleContract,
        };
    }

    componentDidMount() {
        const { contractChange } = this.props;
        this.chartUpdate = setInterval(() => {
            const { dynamicContract } = this.state;
            const newContract = contractChange(dynamicContract);

            this.setState({ dynamicContract: newContract });
        }, 1000);

        window.stopUpdates = () => clearInterval(this.chartUpdate);
    }

    componentWillUnmount() {
        clearInterval(this.chartUpdate);
    }

    render() {
        const { dynamicContract } = this.state;
        return (
            <BinaryChart
                id="dynamic-plot"
                ticks={sampleTicks}
                pipSize={3}
                contract={dynamicContract}
            />
        );
    }
}

const getRandomArbitrary = (min, max) =>
    Math.random() * (max - min) + min;

storiesOf('Plot lines', module)
    .add('Static plot lines', () =>
        <BinaryChart
            id="static-plot"
            ticks={sampleTicks}
            pipSize={3}
            contract={sampleContract}
        />
    )
    .add('Dynamic repeating plot line', () =>
        <DynamicPlotLinesChart
            contractChange={c => Object.assign({}, c)}
        />
    )
    .add('Dynamic diff plot line', () =>
        <DynamicPlotLinesChart
            contractChange={c => {
                const newDateStart = +(c.date_start) + getRandomArbitrary(-5, 5);
                const newPurchaseTime = +(c.purchase_time) + getRandomArbitrary(-5, 5);
                const newEntryTime = +(c.entry_tick_time) + getRandomArbitrary(-5, 5);
                const copy = Object.assign({}, c);
                copy.date_start = newDateStart;
                copy.purchase_time = newPurchaseTime;
                copy.entry_tick_time = newEntryTime;
                return copy;
            }}
        />
    )
    .add('Dynamic diff contract with same plot line', () =>
        <DynamicPlotLinesChart
            contractChange={c => {
                const newSellValid = !(c.is_valid_to_sell);
                const copy = Object.assign({}, c);

                copy.is_valid_to_sell = newSellValid;
                return copy;
            }}
        />
    );
