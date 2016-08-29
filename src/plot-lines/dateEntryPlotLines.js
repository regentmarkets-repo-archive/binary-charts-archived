import { contractCodeToText } from 'binary-utils';
import vertPlotLine from './vertPlotLine';
import timePlotLines from './timePlotLines';

type TimePlotLine = {
    id: string,
    position: 'left' | 'right',
}

const shoudShowPurchaseTime = (contract: Contract): boolean =>
    +contract.purchase_time !== +contract.entry_tick_time &&
        +contract.purchase_time !== +contract.date_start;

// Tick trade does not have to show expiry
const shouldShowExpiry = (contract: TickTradeContract): boolean =>
    !contract.tick_count;

const shouldShowSettlement = (contract: Contract): boolean =>
    +contract.date_settlement !== +contract.date_expiry;

const shouldShowSellTime = contract => !contract.exit_tick_time && contract.sell_time;

export default (contract: Contract, theme: Theme): TimePlotLine[] => {
    if (!contract) {
        return [];
    }

    return timePlotLines
        .filter((x: TimePlotLine) => contract[x.id])
        .filter((x: TimePlotLine) => x.id !== 'purchase_time' || shoudShowPurchaseTime(contract))
        .filter((x: TimePlotLine) => x.id !== 'date_expiry' || shouldShowExpiry(contract))
        .filter((x: TimePlotLine) => x.id !== 'date_settlement' || shouldShowSettlement(contract))
        .filter((x: TimePlotLine) => x.id !== 'sell_time' || shouldShowSellTime(contract))
        .map((x: TimePlotLine) => vertPlotLine({
            id: x.id,
            epoch: contract[x.id],
            // workaround: sell_time is exit_tick_time when contract is sold and there is not exit_tick_time
            // api is broken, JY says keep it ...
            text: contractCodeToText(x.id === 'sell_time' ? 'exit_tick_time' : x.id),
            position: x.position,
            theme,
        }));
};
