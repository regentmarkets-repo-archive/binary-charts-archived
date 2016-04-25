import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import DynamicChart from './DynamicChart';

storiesOf('Basic', module)
    .add('Empty', () =>
        <BinaryChart />
    )
    .add('Simple', () =>
        <BinaryChart
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
            ]}
        />
    )
    .add('Resizable', () =>
        <div style={{ display: 'flex' }}>
            <BinaryChart
                style={{ flex: 1 }}
                ticks={[
                    { epoch: 0, quote: 50 },
                    { epoch: 1, quote: 40 },
                    { epoch: 2, quote: 60 },
                ]}
            />
            <div style={{ flex: 1, background: '#eee' }} />
        </div>
    )
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
            trade={{ pipSize: 3 }}
        />
    )
    .add('Dynamic', () =>
        <DynamicChart />
    )
    .add('Dynamic with contract', () =>
        <DynamicChart contract={{ contract_type: 'CALL' }} />
    );
