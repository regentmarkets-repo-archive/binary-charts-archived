import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

const contractsBasic = {
    Higher: {
        contract_type: 'CALL',
    },
    Lower: {
        contract_type: 'PUT',
    },
    Rise: {
        contract_type: 'CALL',
        barrier: '10',
    },
    Fall: {
        contract_type: 'PUT',
        barrier: '10',
    },
    Touches: {
        contract_type: 'ONETOUCH',
        barrier: '10',
    },
    'Does Not Touch': {
        contract_type: 'NOTOUCH',
        barrier: '10',
    },
    'Ends Between': {
        contract_type: 'EXPIRYRANGE',
        barrierType: 'relative',
        barrier: '10',
        barrier2: '-10',
    },
    'Ends Outside': {
        contract_type: 'EXPIRYMISS',
        barrierType: 'relative',
        barrier: '10',
        barrier2: '-10',
    },
    'Stays Between': {
        contract_type: 'RANGE',
        barrierType: 'relative',
        barrier: '10',
        barrier2: '-10',
    },
    'Goes Outside': {
        contract_type: 'UPORDOWN',
        barrierType: 'relative',
        barrier: '10',
        barrier2: '-10',
    },
};

const contractsDigits = {
    'Digit Match': {
        contract_type: 'DIGITMATCH',
    },
    'Digit Differs': {
        contract_type: 'DIGITDIFF',
    },
    'Digit Over': {
        contract_type: 'DIGITOVER',
    },
    'Digit Under': {
        contract_type: 'DIGITUNDER',
    },
    'Digit Even': {
        contract_type: 'DIGITEVEN',
    },
    'Digit Odd': {
        contract_type: 'DIGITODD',
    },
};

const contractsAdvanced = {
    'Asian Up': {
        contract_type: 'ASIANU',
    },
    'Asian Down': {
        contract_type: 'ASIAND',
    },
    'Spread Long': {
        contract_type: 'SPREADU',
    },
    'Spread Short': {
        contract_type: 'SPREADD',
    },
};

const createStories = (category, contracts) =>
    Object.keys(contracts).forEach(key =>
        storiesOf(category, module)
            .add(key, () =>
                <BinaryChart
                    ticks={ticks}
                    pipSize={2}
                    trade={contracts[key]}
                />
            )
    );

createStories('Contract Types - Basic', contractsBasic);
createStories('Contract Types - Digits', contractsDigits);
createStories('Contract Types - Advanced', contractsAdvanced);
