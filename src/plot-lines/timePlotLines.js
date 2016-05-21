// entries are in chronological order
export default [
    { id: 'purchase_time', position: 'right' },
    // Purchase Time, present only for sell transaction

    { id: 'date_start', position: 'left' },
    // Start Time

    { id: 'entry_tick_time', position: 'right' },
    // Entry Spot Time

    { id: 'date_expiry', position: 'right' },
    // Expiry Time, when the contract is expected to expire
    // { id: 'expiry_time', position: 'right' },
    // Expiry time is the same as date_expiry but incorrectly named in Portfolio call

    { id: 'exit_tick_time', position: 'left' },
    // Exit Time, when the contact actually expires
    // Do not show if value is same as date_expiry

    { id: 'date_settlement', position: 'right' },
    // Settlement Time, depends on market, shown in trading times

    { id: 'sell_time', position: 'right' },
    // Sell Time, when the server performed sell action
];

// If contract is open => we should use date_expiry
// If contract is expired => we should use exit_tick_time
// If contract is sold before expired => we should use sell_spot_time
