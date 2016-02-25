import { optionsCombiner } from '../utils/ChartsOptionsUtils';

const createAxisLine = (color = 'rgb(0, 121, 105)', width = '1', type = 'solid') => ({
    lineStyle: { color, width, type }
});

const createAxisTick = (show = true, interval = 'auto', color = '#333') => ({
    show,
    interval,
    lineStyle: { color }
});

export const createXAxis = (
    name,
    data = [],
    type = 'value',
    position = 'bottom',
    axisLine = createAxisLine(),
    axisTick = createAxisTick()
) => {
    "use strict";
    if (!type || type === 'category') {
        if (!data) {
            throw new Error('There should be data for category axis');
        }
    }
    const xAxis = {
        name,
        data,
        type,
        scale: true,
        position,
        axisLine,
        axisTick
    };

    return xAxis;
};

export const createYAxis = (
    name,
    data = [],
    type = 'value',
    position = 'right',
    axisLine = createAxisLine(),
    axisTick = createAxisTick()
) => {
    "use strict";
    if (!type || type === 'category') {
        if (!data) {
            throw new Error('There should be data for category axis');
        }
    }
    const yAxis = {
        name,
        data,
        type,
        scale: true,
        position,
        axisLine,
        axisTick
    };

    return yAxis;
};
