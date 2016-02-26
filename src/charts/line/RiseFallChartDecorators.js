const verticalLastData = ({size: size = [60, 40]} = {}) => ({
    symbol: 'rect',
    symbolSize: size,
    symbolOffset: [0, 50],
    label: {
        normal: {
            show: true,
            position: 'inside',
            textStyle: {
                color: 'blue',
                fontSize: 12
            }
        },
        emphasis: {
            show: true,
            position: 'inside',
            textStyle: {
                color: 'white',
                fontSize: 12
            }
        }
    },
    itemStyle: {
        normal: {
            color: 'rgba(255, 255, 255, 0.2)'
        },
        emphasis: {
            color: 'rgb(236, 79, 147)',
        }
    }
});

const horizontalLastData = () => ({
    symbol: 'rect',
    symbolSize: [30, 15],
    symbolOffset: [20, 0],
    label: {
        normal: {
            show: true,
            position: 'inside',
            textStyle: {
                color: 'white',
                fontSize: 12
            }
        },
        emphasis: {
            show: true,
            position: [7, 0],
            textStyle: {
                color: 'red',
                fontSize: 12
            }
        }
    },
    itemStyle: {
        normal: {
            color: 'red',
        },
        emphasis: {
            color: 'white',
        }
    }
});

const currentSpotLData = () => ({
    symbol: 'rect',
    symbolSize: [30, 15],
    symbolOffset: [20, 0],
    label: {
        normal: {
            show: true,
            position: 'inside',
            textStyle: {
                color: 'white',
                fontSize: 12
            }
        },
        emphasis: {
            show: true,
            position: [7, 0],
            textStyle: {
                color: 'green',
                fontSize: 12
            }
        }
    },
    itemStyle: {
        normal: {
            color: 'green',
        },
        emphasis: {
            color: 'white',
        }
    }
});

const verticalLineFormatter = params => `${params.seriesName} \n${params.value[0]}`;

const horizontalLineFormatters = [
    params => `${params.value[1]}`,
    params => `${params.seriesName}: ${params.value[1]}`
];

const verticalLineLabel = {
    normal: {
        formatter: verticalLineFormatter,
    },
    emphasis: {
        formatter: verticalLineFormatter,
    }
};
const horizontalLineLabel = {
    normal: {
        formatter: horizontalLineFormatters[0],
    },
    emphasis: {
        formatter: horizontalLineFormatters[1],
    }
};

const dottedLineStyle = (color1 = 'rgb(242, 150, 89)', color2 = 'rgb(250, 104, 7)') => ({
    normal: {
        color: color1,
        type: 'dashed',
        width: 1,
    },
    emphasis: {
        color: color2,
        type: 'solid',
        width: 2,
    }
});

export const decorateVerticalLineSeries = (series) => {
    const lastData = series.data[1];                // straight line has only 2 data
    const styleLastData = Object.assign(verticalLastData({test: 'watever'}), lastData);
    series.data[1] = styleLastData;

    const seriesWithFormatter = Object.assign({label: verticalLineLabel}, series)

    return Object.assign(seriesWithFormatter, {lineStyle: dottedLineStyle()});
};

export const decorateHorizontalLineSeries = series => {
    const lastData = series.data[1];                // straight line has only 2 data
    const styleLastData = Object.assign(horizontalLastData(), lastData);
    series.data[1] = styleLastData;

    const seriesWithFormatter = Object.assign({
        label: horizontalLineLabel,
        animation: true,
        animationDuration: 10,
    }, series)

    return Object.assign(seriesWithFormatter, {lineStyle: dottedLineStyle()});
};

// this is special as it should have high priority why overlapping
export const decorateCurrentSpotLine = series => {
    const lastData = series.data[1];                // straight line has only 2 data
    const styleLastData = Object.assign(currentSpotLData(), lastData);
    series.data[1] = styleLastData;

    const seriesWithFormatter = Object.assign({
        label: horizontalLineLabel,
        animation: true,
        animationDuration: 10,
        zlevel: 2,
    }, series)

    return Object.assign(seriesWithFormatter, {lineStyle: dottedLineStyle()});
};
