import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './DynamicChart';

storiesOf('Indicators', module)
    .add('Empty', () =>
        <DynamicChart />
    );
