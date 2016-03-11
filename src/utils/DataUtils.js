export const findYMin = (data) => data
    .map(d => d[1])
    .reduce((a, b) => Math.min(a, b));
export const findYMax = (data) => data
    .map(d => d[1])
    .reduce((a, b) => Math.max(a, b));

export const findXMin = (data) => data[0][0];
export const findXMax = (data) => data[data.length - 1][0];

const percentOf = (min, max, percent, precision = 0) => +((max - min) * percent).toFixed(precision);

export const getXBoundaryInValue = (data, percentage) => {
    const min = findXMin(data);
    const max = findXMax(data);
    const offset = percentOf(min, max, percentage);
    return [min - offset, max + offset];
};

export const getYBoundaryInValue = (data, percentage) => {
    const min = findYMin(data);
    const max = findYMax(data);
    const offset = percentOf(min, max, percentage);
    return [min - offset, max + offset];
};




export const tickToData = tick => [
    tick.epoch * 1000,
    tick.quote,
];


export const areArraysEqual = (arr1, arr2) =>
    arr1.length === arr2.length &&
        arr1.every((x, idx) => x === arr2[idx]);

export const doTicksEqual = (tick1, tick2) =>
    tick1 === tick2 ||
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
}

export const areTickArraysEqual = (ticks1, ticks2) =>
    ticks1.length === ticks2.length &&
        (ticks1.length === 0 || ticks1[ticks1.length - 1].epoch === ticks2[ticks2.length - 1].epoch);
