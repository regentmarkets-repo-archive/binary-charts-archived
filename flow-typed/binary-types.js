declare type Barriers = number[];

export type ChartTick = number[];

export type Candle = {
    open: number,
    high: number,
    low: number,
    close: number,
    epoch: number,
};

export type ChartCandle = number[];

export type Contract = {
    contract_type: string,
    forward_starting_options?: [],
    barrier?: number,
    barrier2?: number,
    entry_spot?: number,
};

export type SpreadContract = Contract & {
    amount_per_point: number,
    stop_type: 'dollar' | 'point',
    stop_profit: number,
    stop_loss: number,
};

export type PrettySpreadContract = {
    amountPerPoint: number,
    stopType: 'dollar' | 'point',
    stopProfit: number,
    stopLoss: number,
};

export type ExtendedContract = Contract & {
    contract_type: string,
    barrierType: number,
    min_contract_duration: string,
};

export type ContractType = 'CALL' | 'PUT' | 'HIGHER' | 'LOWER' |
    'DIGITMATCH' | 'DIGITDIFF' | 'DIGITOVER' | 'DIGITUNDER' | 'DIGITEVEN' | 'DIGITODD' |
    'ASIANU' | 'ASIAND' | 'EXPIRYRANGE' | 'EXPIRYMISS' | 'RANGE' | 'UPORDOWN' |
    'ONETOUCH' | 'NOTOUCH' | 'SPREADU' | 'SPREADD';

export type DurationUnit = 't' | 'm' | 's' | 'h' | 'd';

export type Range = {
    unit: DurationUnit,
    min: number,
    max: number,
};

export type OpenContract = {
    contract_id: number,
    transaction_id: number,
    purchase_time: number,
    symbol: string,
    payout: number,
    buy_price: number,
    date_start: number,
    expiry_time: number,
    contract_type: string,
    currency: string,
    longcode: string,
    app_id?: number,
};

export type Proposal = {
    ask_price: number,
};

export type Tick = {
    quote: number,
    epoch: number,
};
