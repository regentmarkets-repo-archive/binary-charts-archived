export const tickToData = tick => [
    tick.epoch * 1000,
    tick.quote,
];

export const areArraysEqual = (arr1, arr2) =>
    arr1.length === arr2.length &&
        arr1.every((x, idx) => x === arr2[idx]);

export const doTicksEqual = (tick1, tick2) =>
    !tick1 && tick1 === tick2 ||                    // undefined tick should not be treated as equal in our context
    !!tick1 && !!tick2 && tick1.epoch === tick2.epoch && tick1.quote === tick2.quote;

export const doTicksDifferJustOneEntry = (ticks1, ticks2) => {
    switch (Math.abs(ticks1.length - ticks2.length)) {
        case 0:
        case 1:
            return doTicksEqual(ticks1[ticks1.length - 1], ticks2[ticks2.length - 2])
                || doTicksEqual(ticks1[ticks1.length - 2], ticks2[ticks2.length - 1]);
        default:
            return false;
    }
};

export const areTickArraysEqual = (ticks1, ticks2) =>
    ticks1.length === ticks2.length &&
        (ticks1.length === 0 || ticks1[ticks1.length - 1].epoch === ticks2[ticks2.length - 1].epoch);

export const commonRelativeBarrier = (barrier, entrySpot, lastSpot) =>
    +barrier + (+entrySpot || (lastSpot && lastSpot.quote));

export const relativeBarrier = (contract, lastSpot) =>
    commonRelativeBarrier(contract.barrier, contract.entry_spot, lastSpot);

export const relativeBarrier2 = (contract, lastSpot) =>
    commonRelativeBarrier(contract.barrier2, contract.entry_spot, lastSpot);

export const callPutBarrier = (contract, lastSpot) =>
    contract.barrier ?
        relativeBarrier(contract, lastSpot) :
        +contract.entry_spot || (lastSpot && lastSpot.quote);

export const getLastTick = ticks =>
    ticks && (ticks.length === 0 ? undefined : ticks[ticks.length - 1]);
