import brandColor from 'binary-utils/lib/brandColor';
import contractCodeToText from 'binary-utils/lib/contractCodeToText';
import vertPlotLine from './vertPlotLine';
import timePlotLines from './timePlotLines';

const lineColor = brandColor(0.5);

const shoudShowPurchaseTime = contract =>
    contract.purchase_time !== contract.entry_tick_time &&
        contract.purchase_time !== contract.date_start;

// const shouldShowExitSpot = contract =>
//     contract.exit_tick_time !== contract.date_expiry;

// Tick trade does not have to show expiry
const shouldShowExpiry = contract => !contract.tick_count;

const shouldShowSettlement = contract =>
    contract.date_settlement !== contract.date_expiry;

export default (contract) => {
    if (!contract) {
        return [];
    }

    return timePlotLines
        .filter(param => contract[param.id])
        .filter(param => param.id !== 'purchase_time' || shoudShowPurchaseTime(contract))
        // .filter(param => param.id !== 'exit_tick_time' || shouldShowExitSpot(contract))
        .filter(param => param.id !== 'date_expiry' || shouldShowExpiry(contract))
        .filter(param => param.id !== 'date_settlement' || shouldShowSettlement(contract))
        .filter(param => param.id !== 'sell_time')
        .map(param =>
            vertPlotLine(param.id, contract[param.id], lineColor, contractCodeToText(param.id), param.position)
        );
};
