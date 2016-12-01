import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { nowAsEpoch } from 'binary-utils';
import BinaryChart from '../src/BinaryChart';
import ticks, { massiveTicks } from './ticks';


const fakeTrade = {
    date_start: nowAsEpoch() + 60000,
    duration: 2,
    amount: 50,
    duration_unit: 'm',
    contract_type: 'CALL',
    basis: 'stake',
};

const fakeTrade2 = {
    date_start: 1465873888 + 6000,
    date_expiry: 1465873888 + 100000,
    duration: 2,
    amount: 50,
    duration_unit: 'm',
    contract_type: 'CALL',
    basis: 'stake',
};

storiesOf('In future', module)
    .add('Start later simple', () =>
        <BinaryChart
            ticks={ticks}
            pipSize={3}
            trade={fakeTrade}
        />
    )
    .add('Start later much more data', () =>
        <BinaryChart
            ticks={massiveTicks}
            pipSize={3}
            trade={fakeTrade}
        />
    )
    .add('Exit later much more data', () =>
        <BinaryChart
            ticks={massiveTicks}
            pipSize={3}
            trade={fakeTrade2}
        />
    );
