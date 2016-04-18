import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

storiesOf('Times', module)
    .add('Standard', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                date_start: 1,
                entry_tick_time: 2,
                exit_tick_time: 4,
                expiry_time: 4,
            }}
        />
    )
    .add('All', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                purchase_time: 1,
                date_start: 1,
                entry_tick_time: 2,
                sell_spot_time: 3,
                exit_tick_time: 4,
                expiry_time: 4,
                date_settlement: 5,
                date_expiry: 5,
            }}
        />
    )
    .add('Ends In Future', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                entry_tick_time: 3,
                exit_tick_time: 10,
            }}
        />
    )
    .add('Barrier outside ticks', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                contract_type: 'CALL',
                barrier: 100,
            }}
        />
    )
    .add('Trading Times', () =>
        <BinaryChart
            ticks={ticks}
            tradingTimes={{
                open: [
                    '02:00:00',
                    '06:30:00',
                ],
                close: [
                    '05:00:00',
                    '08:50:00',
                ],
                settlement: '11:50:00',
            }}
        />
    );
