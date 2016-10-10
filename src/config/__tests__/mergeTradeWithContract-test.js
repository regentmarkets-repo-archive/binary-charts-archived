import mergeTradeWithContract from '../mergeTradeWithContract';

describe('mergeTradeWithContract', () => {
    it('should reuse contract values', () => {
        const contract = {                      // eslint-disable-line camelcase
            barrier_count: 1,
            barrier: 100,
        };

        const actual = mergeTradeWithContract(undefined, contract);
        expect(actual).toEqual(contract);
    });

    it('should use last tick as barrier for 1 barrier contract when absent from contract', () => {
        const contract = {                      // eslint-disable-line camelcase
            barrier_count: 1,
        };

        const lastTick = 1000;

        const actual = mergeTradeWithContract(undefined, contract, lastTick);
        expect(actual).toEqual({ barrier_count: 1, barrier: 1000 });
    });

    it('should use trade barrier as barrier for 2 barrier contract when absent from contract', () => {
        const contract = {                      // eslint-disable-line camelcase
            barrier_count: 2,
        };

        const trade = {
            barrierType: 'absolute',
            barrier: 1000,
            barrier2: 100,
        };

        const lastTick = 1000;

        const actual = mergeTradeWithContract(trade, contract, lastTick);
        expect(actual).toEqual({ low_barrier: 100, high_barrier: 1000, entry_tick: lastTick });
    });

    it('should add last tick to barrier when barrierType is relative', () => {
        const trade = {
            barrierType: 'relative',
            barrier: 1000,
            barrier2: 100,
        };

        const lastTick = 1000;

        const actual = mergeTradeWithContract(trade, undefined, lastTick);
        expect(actual).toEqual({ low_barrier: 1100, high_barrier: 2000, entry_tick: lastTick });
    });
});
