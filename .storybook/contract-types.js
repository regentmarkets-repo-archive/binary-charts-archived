import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

const contracts = {
    Higher: {
        type: 'CALL',
    },
    Lower: {
        type: 'PUT',
    },
    Rise: {
        type: 'CALL',
        barrier: 10,
    },
    Fall: {
        type: 'PUT',
        barrier: 10,
    },
    'Digit Match': {
        type: 'DIGITMATCH',
    },
    'Digit Differs': {
        type: 'DIGITDIFF',
    },
    'Digit Over': {
        type: 'DIGITOVER',
    },
    'Digit Under': {
        type: 'DIGITUNDER',
    },
    'Digit Even': {
        type: 'DIGITEVEN',
    },
    'Digit Odd': {
        type: 'DIGITODD',
    },
    'Asian Up': {
        type: 'ASIANU',
    },
    'Asian Down': {
        type: 'ASIAND',
    },
    'Ends Between': {
        type: 'EXPIRYRANGE',
        barrier: 10,
        barrier2: -10,
    },
    'Ends Outside': {
        type: 'EXPIRYMISS',
        barrier: 10,
        barrier2: -10,
    },
    'Stays Between': {
        type: 'RANGE',
        barrier: 10,
        barrier2: -10,
    },
    'Goes Outside': {
        type: 'UPORDOWN',
        barrier: 10,
        barrier2: -10,
    },
    Touches: {
        type: 'ONETOUCH',
        barrier: 10,
    },
    'Does Not Touch': {
        type: 'NOTOUCH',
        barrier: 10,
    },
    'Spread Long': {
        type: 'SPREADU',
    },
    'Spread Short': {
        type: 'SPREADD',
    },
};

Object.keys(contracts).forEach(key =>
    storiesOf('Contract Types', module)
        .add(key, () =>
            <BinaryChart
                ticks={ticks}
                contract={contracts[key]}
            />
        )
);
