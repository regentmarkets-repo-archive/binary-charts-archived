import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ContractChart from './ContractChart';

const contract5day = '8686428788';

storiesOf('Open Contracts', module)
    .add('5 days contract', () =>
        <ContractChart contractID={contract5day} />
    );
