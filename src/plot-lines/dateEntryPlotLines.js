const vertPlotLine = (epoch, color, text) => ({
    id: text,
    value: epoch * 1000,
    color,
    width: 2,
    label: {
        text,
        style: {
            color,
        }
    }
});

export default (contract) => [
    vertPlotLine(contract.date_expiry, 'blue', 'Time of Expiry'),
    vertPlotLine(contract.date_settlement, 'blue', 'Settlement Time'),
    vertPlotLine(contract.date_start, 'blue', 'Start Time'),
    vertPlotLine(contract.entry_tick_time, 'blue', 'Entry Spot'),
    vertPlotLine(contract.expiry_time, 'blue', 'Expiry Time'),
];
