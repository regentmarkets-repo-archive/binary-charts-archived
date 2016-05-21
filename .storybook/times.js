import React from 'react';
import { storiesOf } from '@kadira/storybook';
import contractCodeToText from 'binary-utils/lib/contractCodeToText';
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
                date_start: 2,
                entry_tick_time: 3,
                date_expiry: 4,
                exit_tick_time: 5,
                date_settlement: 6,
                sell_time: 7,
            }}
        />
    )
    .add('Real example', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                date_start: 1,
                purchase_time: 1,
                entry_tick_time: 2,
                date_expiry: 6,
                exit_tick_time: 6,
                sell_time: 7,
            }}
        />
    )
    .add(contractCodeToText('purchase_time') + ' not shown if same as ' + contractCodeToText('entry_tick_time'), () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                purchase_time: 2,
                entry_tick_time: 2,
            }}
        />
    )
    .add(contractCodeToText('exit_tick_time') + ' is not shown if the same as '
        + contractCodeToText('date_expiry'), () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                exit_tick_time: 3,
                date_expiry: 3,
            }}
        />
    )
    .add('If ' + contractCodeToText('expiry_time') + ' is earlier than '
    + contractCodeToText('sell_time'), () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                sell_time: 2,
                expiry_time: 4,
            }}
        />
    )
    .add('If all end on same time, show ...', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                date_start: 1,
                entry_tick_time: 2,
                date_settlement: 4,
                date_expiry: 4,
                sell_spot_time: 4,
                exit_tick_time: 4,
            }}
        />
    )
    .add('Contract Is Open', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                entry_tick_time: 3,
            }}
        />
    )
    .add('Barrier outside ticks', () =>
        <BinaryChart
            ticks={ticks}
            contract={{
                contract_type: 'CALL',
                barrier: '100',
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
