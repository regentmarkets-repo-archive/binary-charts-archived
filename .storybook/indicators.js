import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './charts/DynamicChart';

storiesOf('Indicators', module)
    .add('Trend Line', () =>
        <DynamicChart />
    )
    .add('Simple Moving Average', () =>
        <DynamicChart indicators={[{ type: 'sma', periods: 3 }]} />
    )
    .add('Exponential Moving Average', () =>
        <DynamicChart indicators={[{ type: 'ema', periods: 3 }]} />
    )
    .add('2 Simple Moving Average', () =>
        <DynamicChart indicators={[{ type: 'sma', periods: 3 }, { type: 'sma', periods: 7 }]} />
    )
    .add('Relative Strength Index', () =>
        <DynamicChart />
    )
    .add('Bollinger Band', () =>
        <DynamicChart />
    );
