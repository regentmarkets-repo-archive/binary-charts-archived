import { brand } from '../_utils';

const vertPlotLine = (epoch, color, text, position) => ({
    id: text,
    value: epoch * 1000,
    color,
    width: 2,
    label: {
        text,
        rotation: position === 'left' ? 270 : 90,
        x: position === 'left' ? -5 : 5,
        textAlign: position === 'left' ? 'right' : 'left',
        verticalAlign: 'top',
        style: {
            color,
        },
    },
});

const lineColor = brand(1);

export default (contract) => [
    vertPlotLine(contract.purchase_time, lineColor, 'Purchase Time', 'left'),
    vertPlotLine(contract.date_start, lineColor, 'Start Time', 'left'),
    vertPlotLine(contract.entry_tick_time, lineColor, 'Entry Spot', 'right'),
    vertPlotLine(contract.date_expiry, lineColor, 'Time of Expiry', 'left'),
    vertPlotLine(contract.date_settlement, lineColor, 'Settlement Time', 'right'),
    vertPlotLine(contract.expiry_time, lineColor, 'End Time', 'right'),
    vertPlotLine(contract.exit_tick_time, lineColor, 'Exit Spot', 'left'),
    vertPlotLine(contract.sell_spot_time, lineColor, 'Sell Time', 'right'),
];
