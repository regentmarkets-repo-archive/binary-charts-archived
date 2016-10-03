import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { nowAsEpoch } from 'binary-utils';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

const future = nowAsEpoch() + 6000;

storiesOf('Extremes', module)
    .add('Start Later', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                contract_type: 'CALL',
                date_start: future,
                entry_tick_time: 3,
                exit_tick_time: 10,
            }}
        />
    )
    .add('Barrier outside of ticks', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                contract_type: 'CALL',
                barrier: 80,
            }}
        />
    );
