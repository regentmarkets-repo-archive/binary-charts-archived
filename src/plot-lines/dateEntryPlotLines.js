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
    vertPlotLine(contract.date_expiry, 'green', 'date_expiry'),
    vertPlotLine(contract.date_settlement, 'green', 'date_settlement'),
    vertPlotLine(contract.date_start, 'green', 'date_start'),
    vertPlotLine(contract.entry_tick_time, 'green', 'entry_tick_time'),
    vertPlotLine(contract.expiry_time, 'green', 'expiry_time'),
];
