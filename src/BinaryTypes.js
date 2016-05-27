import { PropTypes } from 'react';

export const stringOrNumber = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
]);

export const contractOrTrade = PropTypes.shape({
    barrier: stringOrNumber,
    barrier2: stringOrNumber,
    barrierType: PropTypes.oneOf(['absolute', 'relative', 'digit']),
    contract_type: PropTypes.string.isRequired,
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

export const tradingTimes = PropTypes.shape({
    open: PropTypes.arrayOf(PropTypes.string),
    close: PropTypes.arrayOf(PropTypes.string),
    settlement: PropTypes.string.isRequired,
});

export const events = PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
}));
