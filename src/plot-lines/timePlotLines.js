// entries are in chronological order
export default [
    { id: 'date_start', position: 'left' },
    // St`art Time

    { id: 'purchase_time', position: 'right' },
    // Time at which contract was purchased, present only for sell transaction

    { id: 'entry_tick_time', position: 'right' },
    // Entry Spot Time

    { id: 'date_expiry', position: 'left' },
    // Time when contract is expected to expire
    // { id: 'expiry_time', position: 'left' },
    // Expiry time is the same as date_expiry but incorrectly named in Portfolio call

    { id: 'exit_tick_time', name: 'Exit Spot', position: 'left' },
    // Time when the contact actually expires
    // Do not show if value is same as date_expiry

    { id: 'date_settlement', position: 'right' },
    // Settlement time, depends on market, shown in trading times

    { id: 'sell_time', position: 'right' },
    // Time when server performed sell action
];

// If contract is open => we should use date_expiry
// If contract is expired => we should use exit_tick_time
// If contract is sold before expired => we should use sell_spot_time
