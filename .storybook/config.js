import { configure } from '@kadira/storybook';

configure(() => {
    require('./simple');
    require('./contract-types');
    require('./times');
    require('./dynamic-fetching');
    require('./past-contracts');
    require('./open-contracts');
    require('./indicators');
    require('./plotlines');
    require('./ohlc');
}, module);
