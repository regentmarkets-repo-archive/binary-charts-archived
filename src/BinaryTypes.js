export type stringOrNumber = string | number;

export type Epoch = number;

export type contractOrTrade = {
    barrier: mumber,
    barrier2: number,
    barrierType: 'absolute' | 'relative' | 'digit',
    contract_type: string,
    date_expiry: Epoch,
    date_settlement: number,
    date_start: Epoch,
    entry_spot: number,
    entry_tick_time: Epoch,
    exit_tick_time: Epoch,
    expiry_time: Epoch,
    purchase_time: Epoch,
    sell_spot_time: Epoch,
};

export type tickArray = Tick[];

export type tradingTimes = {
    open: string[],
    close: string[],
    settlement: string,
};

export type ChartEvent = {
    type: string,
    handler: () => void,
}

export type events = ChartEvents[];
