import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import DynamicChart from './charts/DynamicChart';
import { massiveTicks } from './ticks';
import DynamicTimeInterval from './charts/DynamicTimeInterval';

const realTrade = {
    tradeCategory: 'risefall',
    duration: 5,
    amount: 50,
    duration_unit: 't',
    symbol: 'R_100',
    contract_type: 'CALL',
    basis: 'stake',
};

storiesOf('Data', module)
    .add('Missing data (nulls)', () =>
        <BinaryChart
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: null },
                { epoch: 3, quote: null },
                { epoch: 4, quote: null },
                { epoch: 5, quote: 20 },
                { epoch: 6, quote: 30 },
            ]}
        />
    )
    .add('Missing data (no entries)', () =>
        <BinaryChart
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 5, quote: 20 },
                { epoch: 6, quote: 30 },
            ]}
        />
    )
    .add('Pip size of 3', () =>
        <BinaryChart
            ticks={[
                { epoch: 0, quote: 50.021 },
                { epoch: 1, quote: 40.222 },
                { epoch: 5, quote: 20.333 },
                { epoch: 6, quote: 30.444 },
            ]}
            pipSize={3}
        />
    )
    .add('Pip size of 2, different symbol', () =>
        <BinaryChart
            symbol="symbol"
            ticks={[
                { epoch: 0, quote: 50.021 },
                { epoch: 1, quote: 40.222 },
                { epoch: 5, quote: 20.333 },
                { epoch: 6, quote: 30.444 },
            ]}
            pipSize={2}
        />
    )
    .add('Pip size larger than ticks', () =>
        <BinaryChart
            ticks={[
                { epoch: 0, quote: 20 },
                { epoch: 1, quote: 21 },
                { epoch: 2, quote: 20 },
                { epoch: 3, quote: 21 },
            ]}
        />
    )
    .add('Dynamic', () =>
        <DynamicChart />
    )
    .add('Dynamic with contract', () =>
        <DynamicChart contract={{ contract_type: 'CALL', barrier: '+53.42', date_start: 1465992307 + 1000 }} />
    )
    .add('Dynamic with trade', () =>
        <DynamicChart trade={{ contract_type: 'CALL', barrier: '+53.42' }} />
    )
    .add('Dynamic with plot lines', () =>
        <DynamicChart
            contract={{
                contract_type: 'CALL',
                date_start: (new Date().getTime() + 2),
                sell_time: (new Date().getTime() + 5),
            }}
        />
    )
    .add('Massive ticks debug', () =>
        <BinaryChart
            ticks={massiveTicks}
            trade={realTrade}
            pipSize={2}
        />
    )
    .add('Dynamic time interval', () =>
        <DynamicTimeInterval />
    )
;
