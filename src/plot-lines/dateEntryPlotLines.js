import brandColor from 'binary-utils/lib/brandColor';
import vertPlotLine from './vertPlotLine';
import timePlotLines from './timePlotLines';

const lineColor = brandColor(0.5);

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
            vertPlotLine(param.id, contract[param.id], lineColor, param.name, param.position)
        );
};
