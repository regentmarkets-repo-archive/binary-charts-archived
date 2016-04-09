import { brand } from '../_utils';
import vertPlotLine from './vertPlotLine';

const lineColor = brand(1);

const timePlotLines = [
    { id: 'date_start', name: 'Start Time', position: 'left' },
    { id: 'purchase_time', name: 'Purchase Time', position: 'left' },
    { id: 'entry_tick_time', name: 'Entry Spot', position: 'right' },
    { id: 'date_expiry', name: 'Time of Expiry', position: 'left' },
    { id: 'date_settlement', name: 'Settlement Time', position: 'right' },
    { id: 'expiry_time', name: 'End Time', position: 'right' },
    { id: 'exit_tick_time', name: 'Exit Spot', position: 'left' },
    { id: 'sell_spot_time', name: 'Sell Time', position: 'right' },
];

export default (contract) =>
    !contract ?
        [] :
        timePlotLines.map(param =>
            vertPlotLine('time-line', contract[param.id], lineColor, param.name, param.position)
        );
