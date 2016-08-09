import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

storiesOf('Extremes', module)
    .add('Ends In Future', () =>
        <BinaryChart
            id="endslater"
            ticks={ticks}
            contract={{
                contract_type: 'CALL',
                entry_tick_time: 3,
                exit_tick_time: 10,
            }}
        />
    )
    .add('Barrier outside of ticks', () =>
        <BinaryChart
            id="barrier-out-of-ticks"
            ticks={ticks}
            contract={{
                contract_type: 'CALL',
                barrier: '80',
            }}
        />
    );
