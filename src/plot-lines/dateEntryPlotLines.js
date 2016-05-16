import brandColor from 'binary-utils/lib/brandColor';
import vertPlotLine from './vertPlotLine';
import timePlotLines from './timePlotLines';

const lineColor = brandColor(0.5);

const shoudShowPurchaseTime = contract =>
    contract.purchase_time !== contract.entry_tick_time;

const shouldShowExitSpot = contract =>
    contract.exit_tick_time !== contract.date_expiry;
  // Math.abs(contract.exit_tick_time - contract.date_expiry) > 100;

const shouldShowEndTime = contract =>
    contract.expiry_time < contract.sell_spot_time;

export default (contract) => {
    if (!contract) {
        return [];
    }

    return timePlotLines
        .filter(param => contract[param.id])
        .filter(param => param.id !== 'purchase_time' || shoudShowPurchaseTime(contract))
        .filter(param => param.id !== 'exit_tick_time' || shouldShowExitSpot(contract))
        .filter(param => param.id !== 'expiry_time' || shouldShowEndTime(contract))
        .map(param =>
            vertPlotLine(param.id, contract[param.id], lineColor, param.name, param.position)
        );
};
