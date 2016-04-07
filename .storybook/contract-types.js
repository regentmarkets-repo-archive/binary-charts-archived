import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DynamicChart from './DynamicChart';

storiesOf('Contract Types', module)
    .add('CALL', () =>
        <DynamicChart contract={{
            type: 'CALL',
        }} />
    )
    .add('PUT', () =>
        <DynamicChart contract={{
            type: 'PUT',
        }} />
    )
    .add('CALL2', () =>
        <DynamicChart contract={{
            type: 'CALL',
            barrier: 10,
        }} />
    )
    .add('PUT2', () =>
        <DynamicChart contract={{
            type: 'PUT',
            barrier: 10,
        }} />
    )
    .add('DIGITMATCH', () =>
        <DynamicChart contract={{
            type: 'DIGITMATCH',
        }} />
    )
    .add('Digit Differs', () =>
        <DynamicChart contract={{
            type: 'DIGITDIFF',
        }} />
    )
    .add('Digit Over', () =>
        <DynamicChart contract={{
            type: 'DIGITOVER',
        }} />
    )
    .add('Digit Under', () =>
        <DynamicChart contract={{
            type: 'DIGITUNDER',
        }} />
    )
    .add('Digit Even', () =>
        <DynamicChart contract={{
            type: 'DIGITEVEN',
        }} />
    )
    .add('Digit Odd', () =>
        <DynamicChart contract={{
            type: 'DIGITODD',
        }} />
    )
    .add('Asian Up', () =>
        <DynamicChart contract={{
            type: 'ASIANU',
        }} />
    )
    .add('Asian Down', () =>
        <DynamicChart contract={{
            type: 'ASIAND',
        }} />
    )
    .add('Ends Between', () =>
        <DynamicChart contract={{
            type: 'EXPIRYRANGE',
        }} />
    )
    .add('Ends Outside', () =>
        <DynamicChart contract={{
            type: 'EXPIRYMISS',
        }} />
    )
    .add('Asian Down', () =>
        <DynamicChart contract={{
            type: 'ASIAND',
        }} />
    )
    .add('Stays Between', () =>
        <DynamicChart contract={{
            type: 'RANGE',
        }} />
    )
    .add('Goes Outside', () =>
        <DynamicChart contract={{
            type: 'UPORDOWN',
        }} />
    )
    .add('Touches', () =>
        <DynamicChart contract={{
            type: 'ONETOUCH',
        }} />
    )
    .add('Does Not Touch', () =>
        <DynamicChart contract={{
            type: 'NOTOUCH',
        }} />
    )
    .add('Spread Long', () =>
        <DynamicChart contract={{
            type: 'SPREADU',
        }} />
    )
    .add('Spread Short', () =>
        <DynamicChart contract={{
            type: 'SPREADD',
        }} />
    );
