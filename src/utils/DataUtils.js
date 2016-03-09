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

export const tickToData = tick =>
    [new Date(tick.epoch * 1000), tick.quote];

export const areTicksEqual = (ticks1, ticks2) =>
    ticks1.length === ticks2.length &&
        (ticks1.length === 0 || ticks1[ticks1.length - 1].epoch === ticks2[ticks2.length - 1].epoch)
