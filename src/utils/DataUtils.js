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
    "use strict";
    const min = findXMin(data);
    const max = findXMax(data);
    const offset = percentOf(min, max, percentage);
    return [min - offset, max + offset];
};

export const getYBoundaryInValue = (data, percentage) => {
    "use strict";
    const min = findYMin(data);
    const max = findYMax(data);
    const offset = percentOf(min, max, percentage);
    return [min - offset, max + offset];
};
