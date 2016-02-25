import deepMerge from 'deepmerge';

export const combineOptions = (opts) => {
    "use strict";
    return opts.reduce((a, b) => deepMerge(a, b));
};
