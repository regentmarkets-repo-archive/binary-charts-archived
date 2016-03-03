// Config should only deal with size and color!!

/**
 * Full Schema for series config
 *  - width
 *  - color
 *  - areaColor
 *  - labelColor
 *  - labelTextColor
 *  - areaOpacity
 *  - labelFontSize
 */


const seriesConfig = (a) => {
    const defaults = {
        width: 2,
        color: 'green',
        labelFontSize: 12,
        labelColor: 'green',
        labelTextColor: 'white',
    };
    return Object.assign(defaults, a);
};

export const parseSeriesConfig = config => ({
    lineStyle: {
        normal: {
            color: config.color,
        }
    },
    areaStyle: {
        normal: {
            color: config.areaColor,
            opacity: config.areaOpacity,
        }
    },
    itemStyle: {
        normal: {
            color: config.labelColor,
        },
        emphasis: {
            color: config.labelColor,
        }
    },
    label: {
        normal: {
            textStyle: {
                fontSize: config.labelFontSize,
                color: config.labelTextColor
            }
        },
        emphasis: {
            textStyle: {
                fontSize: config.labelFontSize,
                color: config.labelTextColor
            }
        }
    }
});

export const RiseFallConfig = {
    main: seriesConfig({
        color: 'green',
        areaColor: 'blue',
    }),
    barrier: seriesConfig({
        color: 'orange',
        labelColor: 'red',
    }),
    contract: seriesConfig({
        color: 'purple',
        areaColor: 'orange',
        areaOpacity: 0.2,
        labelColor: 'purple',
    }),
    currentSpot: seriesConfig({
        color: 'orange',
    }),
};
