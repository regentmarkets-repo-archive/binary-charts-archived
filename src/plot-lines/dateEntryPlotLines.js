const vertPlotLine = (epoch, color, text, textAlign) => ({
    id: text,
    value: epoch * 1000,
    color,
    width: 2,
    label: {
        text,
        textAlign,
        style: {
            color,
        }
    }
});

export default (contract) => [
    vertPlotLine(contract.purchase_time, 'navy', 'Purchase Time', 'left'),
    vertPlotLine(contract.date_start, 'navy', 'Start Time', 'left'),
    vertPlotLine(contract.entry_tick_time, 'navy', 'Entry Spot', 'right'),
    vertPlotLine(contract.date_expiry, 'navy', 'Time of Expiry', 'left'),
    vertPlotLine(contract.date_settlement, 'navy', 'Settlement Time', 'left'),
    vertPlotLine(contract.expiry_time, 'navy', 'End Time', 'right'),
    vertPlotLine(contract.exit_tick_time, 'navy', 'Exit Spot', 'left'),
    vertPlotLine(contract.sell_spot_time, 'navy', 'Sell Time', 'right'),

];
