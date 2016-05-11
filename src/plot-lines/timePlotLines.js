// entries are in chronological order
export default [
    { id: 'date_start', name: 'Start Time', position: 'left' },
    // Start time - ??? ***

    { id: 'purchase_time', name: 'Purchase Time', position: 'right' },
    // Time at which contract was purchased, present only for sell transaction

    { id: 'entry_tick_time', name: 'Entry Spot', position: 'right' },
    // Entry spot - ??? ***

    { id: 'date_expiry', name: 'End Time', position: 'left' },
    // Time when contract is expected to expire
    { id: 'expiry_time', name: 'End Time', position: 'left' },
    // Expiry time is the same as date_expiry but incorrectly named in Portfolio call

    { id: 'exit_tick_time', name: 'Exit Spot', position: 'left' },
    // Time when the contact actually expires ***

    { id: 'date_settlement', name: 'Settlement Time', position: 'right' },
    // Settlement time, depends on market, shown in trading times

    { id: 'sell_spot_time', name: 'Sell Time', position: 'left' },
    //  time of tick when contract are sold, if there isn’t any tick on that point, it will use the previous tick before sell_ti

    { id: 'sell_time', name: 'Server Sell Time', position: 'right' },
    // Time when server performed sell action
];

// If contract is open => we should use date_expiry
// If contract is expired => we should use exit_tick_time
// If contract is sold before expired => we should use sell_spot_time
