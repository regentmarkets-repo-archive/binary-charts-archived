import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './charts/DynamicChart';

storiesOf('Indicators', module)
    .add('Trend Line', () =>
        <DynamicChart indicators={['trend']} />
    )
    .add('Simple Moving Average', () =>
        <DynamicChart indicators={['SMA']} />
    )
    .add('Relative Strength Index', () =>
        <DynamicChart indicators={['RSI']} />
    )
    .add('Bollinger Band', () =>
        <DynamicChart indicators={['bollinger']} />
    );
