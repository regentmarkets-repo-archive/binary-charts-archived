import { PropTypes } from 'react';

export const barrierType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]);

export const contractOrTrade = PropTypes.shape({
    barrier: barrierType,
    barrier2: barrierType,
    contract_type: PropTypes.string,
    date_expiry: PropTypes.number,
    date_settlement: PropTypes.number,
    date_start: PropTypes.number,
    entry_spot: PropTypes.number,
    entry_tick_time: PropTypes.number,
    exit_tick_time: PropTypes.number,
    expiry_time: PropTypes.number,
    purchase_time: PropTypes.number,
    sell_spot_time: PropTypes.number,
});

export const tickArray = PropTypes.arrayOf(PropTypes.shape({
    epoch: PropTypes.number.isRequired,
    quote: PropTypes.number,
}));
