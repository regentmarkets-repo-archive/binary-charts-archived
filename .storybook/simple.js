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
    .add('Missing data', () =>
        <BinaryChart
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
                { epoch: 3, quote: null },
                { epoch: 4, quote: null },
                { epoch: 5, quote: 20 },
                { epoch: 6, quote: 30 },
            ]}
        />
    )
    .add('Dynamic', () =>
        <DynamicChart />
    );
