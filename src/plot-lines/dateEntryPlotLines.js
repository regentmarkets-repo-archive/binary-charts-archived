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
    vertPlotLine(contract.date_expiry, 'navy', 'Time of Expiry'),
    vertPlotLine(contract.date_settlement, 'navy', 'Settlement Time'),
    vertPlotLine(contract.date_start, 'navy', 'Start Time'),
    vertPlotLine(contract.entry_tick_time, 'navy', 'Entry Spot'),
    vertPlotLine(contract.expiry_time, 'navy', 'Expiry Time'),
];
