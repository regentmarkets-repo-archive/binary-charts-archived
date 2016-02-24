import { optionsCombiner } from '../utils/ChartsOptionsUtils';

const axisLine = (color = 'rgb(0, 121, 105)', width = '1', type = 'solid') => ({
    axisLine: {
        lineStyle: { color, width, type }
    }
});

const axisTick = (show, interval = , color) => ({
    axisTick: {
        interval,
        lineStyle: { color }
    }
});

export const createXAxis = (name, data, type = 'value', position = 'bottom', axisLine = axisLine(), axisTick = axisTick()) => {
    "use strict";
    if (!type || type === 'category') {
        if (!data) {
            throw new Error('There should be data for category axis');
        }
    }

    const allProperties = [name, data, type, position, axisLine, axisTick];

    return optionsCombiner(allProperties);
};
