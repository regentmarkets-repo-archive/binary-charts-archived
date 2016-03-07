import deepMerge from 'deepmerge';

export const combineOptions = (opts) => {
    return opts.reduce((a, b) => deepMerge(a, b));
};
