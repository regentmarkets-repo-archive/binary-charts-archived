import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './DynamicChart';

storiesOf('Trading Times', module)
    .add('Empty', () =>
        <DynamicChart trading-times={[]} />
    );
