import React from 'react';
import { storiesOf } from '@kadira/storybook';
import BinaryChart from '../src/BinaryChart';
import ticks from './ticks';

storiesOf('Basic', module)
    .add('Empty', () =>
        <BinaryChart />
    )
    .add('Simple', () =>
        <BinaryChart
            assetName="Custom Symbol Name"
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
            ]}
        />
    )
    .add('Responsive', () =>
        <div style={{ width: 350 }}>
            <BinaryChart
                assetName="Custom Symbol Name"
                ticks={[
                    { epoch: 0, quote: 123456 },
                    { epoch: 1, quote: 234567 },
                    { epoch: 2, quote: 154321 },
                ]}
            />
        </div>
    )
    .add('Dark Theme', () =>
        <div style={{ background: '#1d1d24', padding: 10 }}>
            <BinaryChart
                ticks={[
                    { epoch: 0, quote: 50 },
                    { epoch: 1, quote: 40 },
                    { epoch: 2, quote: 60 },
                ]}
                contract={{
                    contract_type: 'EXPIRYRANGE',
                    barrierType: 'relative',
                    barrier: '10',
                    barrier2: '-10',
                }}
                theme="dark"
            />
        </div>
    )
    .add('Dark Theme 2', () =>
        <div style={{ background: '#1d1d24', padding: 10 }}>
            <BinaryChart
                ticks={ticks}
                contract={{
                    contract_type: 'DIGITMATCH',
                    purchase_time: 1,
                    date_start: 2,
                    entry_tick_time: 3,
                    date_expiry: 4,
                    exit_tick_time: 5,
                    date_settlement: 6,
                    sell_time: 7,
                }}
                theme="dark"
            />
        </div>
    )
    .add('Compact Toolbar', () =>
        <BinaryChart
            compactToolbar
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
            ]}
        />
    )
    .add('Tooltips', () =>
        <BinaryChart
            showTooltips
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
            ]}
        />
    )
    .add('Toolbar Hidden', () =>
        <BinaryChart
            hideToolbar
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
            ]}
        />
    )
    .add('Time Frame Hidden', () =>
        <BinaryChart
            hideTimeFrame
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
            ]}
        />
    )
    .add('Zoom Controls Hidden', () =>
        <BinaryChart
            hideZoomControls
            ticks={[
                { epoch: 0, quote: 50 },
                { epoch: 1, quote: 40 },
                { epoch: 2, quote: 60 },
            ]}
        />
    )
;
