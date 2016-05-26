import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ContractChart from './charts/ContractChart';

const contract5min = '8686424368';

storiesOf('Closed Contracts', module)
    .add('5 minutes contract', () =>
        <ContractChart contractId={contract5min} />
    );
