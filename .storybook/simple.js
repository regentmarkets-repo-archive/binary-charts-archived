import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import DynamicChart from './DynamicChart';

storiesOf('BinaryChart', module)
    .add('Empty', () =>
        <BinaryChart />
    )
    .add('Dynamic', () =>
        <DynamicChart />
    )
    .add('with no text', () =>
        <button onClick={action('clicked')}>My First Button</button>
    );
