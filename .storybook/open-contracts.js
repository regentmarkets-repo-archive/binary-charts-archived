import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './DynamicChart';

storiesOf('Open Contracts', module)
    .add('Empty', () =>
        <DynamicChart />
    );
