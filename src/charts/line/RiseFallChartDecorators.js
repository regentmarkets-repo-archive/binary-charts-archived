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

const contractLabelData = ({size: size = [60, 40]} = {}) => ({
    symbol: 'rect',
    symbolSize: size,
    symbolOffset: [0, 50],
    label: {
        normal: {
            show: false,
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
            color: 'rgba(255, 255, 255, 0)'
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

const contractFrameFormatter = ended => {
    if (ended) {
        return params => {
            if (params.dataIndex === 1) {
                return `Entry time\n${params.value[0]}`;
            } else if (params.dataIndex === 2) {
                return `Exit time\n${params.value[0]}`;
            }
        };
    } else {
        return params => {
            if (params.dataIndex === 1) {
                return `Entry time\n${params.value[0]}`;
            }
        }
    }
};

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
const contractFrameLabel = ended => ({
    normal: {
        formatter: contractFrameFormatter(ended)
    },
    emphasis: {
        formatter: contractFrameFormatter(ended)
    }
});

const dashedLineStyle = (color) => ({
    normal: {
        color,
        type: 'dashed',
        width: 1,
    }
});

export const decorateVerticalLineSeries = (series) => {
    const lastData = series.data[1];                // straight line has only 2 data
    const styleLastData = Object.assign(verticalLastData(), lastData);
    series.data[1] = styleLastData;

    const seriesWithFormatter = Object.assign({label: verticalLineLabel}, series);

    return Object.assign(seriesWithFormatter, {lineStyle: dashedLineStyle('rgb(242, 150, 89)')});
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

    return Object.assign(seriesWithFormatter, {lineStyle: dashedLineStyle('rgb(242, 150, 89)')});
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
        z: 3,
    }, series)

    return Object.assign(seriesWithFormatter, {lineStyle: dashedLineStyle('rgb(242, 150, 89)')});
};

export const decorateContractFrame = (series, ended = true) => {
    /**
     * convert 2nd data to show label
     * label should in the middle
     * line is dashed line, color use default
     */
    const entryData = series.data[1];                // use 2nd data as it's the left top data point
    const exitData = ended && series.data[2];

    const styleLastData = Object.assign(contractLabelData(), entryData);
    series.data[1] = styleLastData;

    if (ended) {
        series.data[2] = Object.assign(contractLabelData(), exitData);
    }

    const seriesWithFormatter = Object.assign({
        label: contractFrameLabel(ended),
        areaStyle: {
            normal: {
                opacity: 0.2
            }
        }
    }, series);
    return Object.assign(seriesWithFormatter, {lineStyle: dashedLineStyle()});
};
