import React from 'react';
import { storiesOf } from '@kadira/storybook';
import SymbolSwitchable from './charts/SymbolSwitchableChart';

storiesOf('Dynamic data fetching', module)
    .add('Different symbol', () => <SymbolSwitchable />)
