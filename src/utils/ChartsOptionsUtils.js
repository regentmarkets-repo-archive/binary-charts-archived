import deepMerge from 'deepmerge';

export const optionsCombiner = (opts) => {
    "use strict";
    return opts.reduce((a, b) => deepMerge(a, b));
};
