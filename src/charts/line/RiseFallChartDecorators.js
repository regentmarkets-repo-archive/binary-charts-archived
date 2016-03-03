import * as ld from '../../model/LineData';

const verticalLastData = ({size: size = [60, 30], width: width = 700, height: height = 400} = {}) => ({
    symbol: 'rect',
    symbolSize: size,
    symbolOffset: [0, height * 0.1],
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

const contractLabelData = ({size: size = [60, 40], width: width = 700, height: height = 400} = {}) => ({
    symbol: 'rect',
    symbolSize: size,
    symbolOffset: [0, height * 0.1],
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

const horizontalLastData = ({width: width = 700, height: height = 400} = {}) => ({
    symbol: 'rect',
    symbolSize: [width < 500 ? 50: width * 0.1, 15],
    symbolOffset: [width * 0.05, 0],
    label: {
        normal: {
            show: true,
            position: [8, 0],           // 8 is the default margin of label to axis line
            textStyle: {
                color: 'white',
                fontSize: 12
            }
        },
        emphasis: {
            show: true,
            position: [8, 0],
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

const currentSpotLData = ({width: width = 700, height: height = 400} = {}) => ({
    symbol: 'rect',
    symbolSize: [width < 500 ? 50: width * 0.1, 15],
    symbolOffset: [width * 0.05, 0],
    label: {
        normal: {
            show: true,
            position: [8, 0],
            textStyle: {
                color: 'white',
                fontSize: 12
            }
        },
        emphasis: {
            show: true,
            position: [8, 0],
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

const horizontalLineFormatter = params => `${params.value[1]}`;

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
        formatter: horizontalLineFormatter,
    },
    emphasis: {
        formatter: horizontalLineFormatter,
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

export const decorateHorizontalLineSeries = ({series, height: height = 400, width: width = 700}) => {
    const lastData = series.data[1];                // straight line has only 2 data
    series.data[1] = Object.assign(horizontalLastData({height, width}), lastData);

    const seriesWithFormatter = Object.assign({
        label: horizontalLineLabel,
        animation: false,
    }, series)

    return Object.assign(seriesWithFormatter, {lineStyle: dashedLineStyle('rgb(242, 150, 89)')});
};

// this is special as it should have high priority why overlapping
export const decorateCurrentSpotLine = ({series, width: width = 700, height: height = 400}) => {
    const lastData = series.data[1];                // straight line has only 2 data
    const styleLastData = Object.assign(currentSpotLData({width, height}), lastData);
    series.data[1] = styleLastData;

    const seriesWithFormatter = Object.assign({
        label: horizontalLineLabel,
        animation: false,
        z: 3,
    }, series)

    return Object.assign(seriesWithFormatter, {lineStyle: dashedLineStyle('rgb(242, 150, 89)')});
};

export const decorateContractFrame = ({series, ended: ended = true, height: height = 400, width: width = 700}) => {
    /**
     * convert 2nd data to show label
     * label should in the middle
     * line is dashed line, color use default
     */
    const entryData = series.data[1];                // use 2nd data as it's the left top data point
    const exitData = ended && series.data[2];

    series.data[1] = Object.assign(contractLabelData({height, width}), entryData);

    if (ended) {
        series.data[2] = Object.assign(contractLabelData({height, width}), exitData);
    }

    const seriesWithFormatter = ld.decorateSeriesWithAreaStyle(series, {
        normal: {
            opacity: 0.2
        }
    });
    
    return Object.assign(seriesWithFormatter, {
        label: contractFrameLabel(ended),
        lineStyle: dashedLineStyle()
    });
};
