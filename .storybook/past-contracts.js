import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './DynamicChart';

storiesOf('Past Contracts', module)
    .add('Empty', () =>
        <DynamicChart />
    );
