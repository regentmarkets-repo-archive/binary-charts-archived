import brandColor from 'binary-utils/lib/brandColor';
import vertPlotLine from './vertPlotLine';

const lineColor = brandColor(0.5);

export const timePlotLines = [
    { id: 'date_start', name: 'Start Time', position: 'left' },
    { id: 'purchase_time', name: 'Purchase Time', position: 'left' },

    { id: 'date_expiry', name: 'Time of Expiry', position: 'left' },
    { id: 'date_settlement', name: 'Settlement Time', position: 'right' },


    { id: 'entry_tick_time', name: 'Entry Spot', position: 'right' },
    { id: 'expiry_time', name: 'End Time', position: 'right' },
    { id: 'exit_tick_time', name: 'Exit Time', position: 'left' },
    { id: 'sell_spot_time', name: 'Sell Spot Time', position: 'right' },
    { id: 'sell_time', name: 'Sell Time', position: 'right' },
];

export default (contract) => {
    if (!contract) {
        return [];
    }

    return timePlotLines
        .filter(param => contract[param.id])
        .filter(param => param.id !== 'purchase_time' || contract.purchase_time !== contract.date_start)
        .filter(param => param.id !== 'exit_tick_time' || contract.exit_tick_time !== contract.date_expiry)
        .filter(param => param.id !== 'expiry_time' || contract.expiry_time < contract.sell_spot_time)
        .map(param =>
            vertPlotLine('time-line', contract[param.id], lineColor, param.name, param.position)
        );
};
