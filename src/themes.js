import brandColor from 'binary-utils/lib/brandColor';

const whiteColor = percentage =>
    `rgba(255, 255, 255, ${percentage})`;

const themeColors = (colorFunc) => ({
    colors: [colorFunc(1), '#f45b5b', '#8085e9', '#8d4654'],
    series: {
        fillColor: 'red', // colorFunc(0.1),
    },
    xAxis: {
		gridLineColor: colorFunc(0.25),
        labels: {
			style: {
				color: colorFunc(0.75),
			},
		},
		lineColor: colorFunc(0.25),
		title: {
			style: {
                color: colorFunc(0.75),
			},
		},
	},
    yAxis: {
        gridLineColor: colorFunc(0.2),
		labels: {
			style: {
				color: colorFunc(0.75),
			},
		},
		tickColor: colorFunc(0.2),
		title: {
			style: {
				color: colorFunc(0.75),
			},
		},
	},
    navigator: {
		handles: {
			backgroundColor: colorFunc(0.25),
			borderColor: colorFunc(0.5),
		},
		maskFill: colorFunc(0.1),
		series: {
			color: colorFunc(0.25),
			lineColor: colorFunc(0.25),
		},
		xAxis: {
			gridLineColor: colorFunc(0.1),
            labels: {
                style: {
                    color: colorFunc(0.75),
                },
            },
		},
	},
    rangeSelector: {
		buttonTheme: {
			style: {
				color: colorFunc(0.75),
			},
			states: {
				select: {
                    fill: colorFunc(0.1),
					style: {
                        color: colorFunc(0.75),
					},
				},
			},
		},
	},
    navigation: {
        buttonOptions: {
            theme: {
                states: {
                    hover: {
                        fill: colorFunc(0.1),
                        stroke: colorFunc(0.1),
                    },
                },
            },
        },
    },
    tooltip: {
        borderColor: colorFunc(0.25),
        style: {
            color: colorFunc(1),
        },
    },
    noData: {
        style: {
            color: colorFunc(0.5),
        },
    },
});

export const lightTheme = {
    ...themeColors(brandColor),
};

export const darkTheme = {
    ...themeColors(whiteColor),
};

export default {
    chart: {
		style: {
			fontFamily: "'Roboto', sans-serif",
		},
		backgroundColor: 'transparent',
	},
    plotOptions: {
        area: {
            lineWidth: 1.5,
        },
        candlestick: {
            color: '#c03',
            lineColor: '#c03',
            lineWidth: 2,
            upColor: '#2E8836',
            upLineColor: '#2E8836',
            pointPadding: 0.2,
        },
    },
	yAxis: {
		tickWidth: 1,
	},
    labels: {
        style: {
            color: 'red',
        },
    },
    navigator: {
		outlineColor: 'none',
	},
    rangeSelector: {
		buttonTheme: {
			fill: 'none',
            width: null,
            padding: 2,
            r: 2,
            borderRadius: 5,
			states: {
                hover: {
                    fill: 'none',
                },
			},
		},
	},
    tooltip: {
        shadow: false,
    },
    resetZoomButton: {
        theme: {
            display: 'none',
        },
    },
    noData: {
        style: {
            fontSize: '20px',
            fontWeight: 'bold',
        },
    },
    lang: {
        noData: 'Chart data not available for this asset',
    },
};

// const dark = {
// 	plotOptions: {
// 		series: {
// 			dataLabels: {
// 				color: '#B0B0B3',
// 			},
// 			marker: {
// 				lineColor: '#333',
// 			}
// 		},
// 		boxplot: {
// 			fillColor: '#505053',
// 		},
// 		candlestick: {
// 			lineColor: 'white',
// 		},
// 		errorbar: {
// 			color: 'white',
// 		}
// 	},
// 	labels: {
// 		style: {
// 			color: '#707073',
// 		}
// 	},
//
// 	drilldown: {
// 		activeAxisLabelStyle: {
// 			color: '#F0F0F3',
// 		},
// 		activeDataLabelStyle: {
// 			color: '#F0F0F3',
// 		},
// 	},
//
//     navigation: {
//         buttonOptions: {
//             symbolStroke: '#DDDDDD',
//             theme: {
//                 fill: '#505053',
//             },
//         },
//     },
//
//
// 	// special colors for some of the
// 	background2: '#505053',
// 	dataLabelsColor: '#B0B0B3',
// 	textColor: '#C0C0C0',
// 	contrastTextColor: '#F0F0F3',
// 	maskColor: 'rgba(255,255,255,0.3)',
// };
