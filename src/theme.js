import brandColor from 'binary-utils/lib/brandColor';

export default ({
    colors: [brandColor(1), '#f45b5b', '#8085e9', '#8d4654'],
    chart: {
		style: {
			fontFamily: "'Roboto', sans-serif",
		},
		plotBorderColor: 'red',
	},
    plotOptions: {
        area: {
            lineWidth: 1.5,
        },
        candlestick: {
            color: 'red',
            lineColor: 'red',
            lineWidth: 3,
            upColor: 'green',
            upLineColor: 'green',
            pointPadding: 0.3,
        },
    },
    xAxis: {
		gridLineColor: brandColor(0.25),
        labels: {
			style: {
				color: brandColor(0.75),
			},
		},
		lineColor: brandColor(0.25),
		// minorGridLineColor: 'blue',
		// tickColor: 'red',
		title: {
			style: {
                color: brandColor(0.75),
			},
		},
	},
	yAxis: {
        gridLineColor: brandColor(0.2),
		labels: {
			style: {
				color: brandColor(0.75),
			},
		},
		tickColor: brandColor(0.2),
		tickWidth: 1,
		title: {
			style: {
				color: brandColor(0.75),
			},
		},
	},
    labels: {
        style: {
            color: 'red',
        },
    },
    navigator: {
		handles: {
			backgroundColor: brandColor(0.25),
			borderColor: brandColor(0.5),
		},
		outlineColor: 'none',
		maskFill: brandColor(0.1),
		series: {
			color: brandColor(0.25),
			lineColor: brandColor(0.25),
		},
		xAxis: {
			gridLineColor: brandColor(0.1),
            labels: {
                style: {
                    color: brandColor(0.75),
                },
            },
		},
	},
    rangeSelector: {
		buttonTheme: {
			fill: 'none',
            width: null,
            padding: 5,
            r: 2,
            borderRadius: 5,
			style: {
				color: brandColor(0.75),
			},
			states: {
                hover: {
                    fill: 'none',
                },
				select: {
                    fill: brandColor(0.1),
					style: {
                        color: brandColor(0.75),
					},
				},
			},
		},
	},
    tooltip: {
        borderColor: brandColor(0.25),
        shadow: false,
        style: {
            color: brandColor(1),
        },
    },
    resetZoomButton: {
        theme: {
            display: 'none',
        },
    },
    navigation: {
        buttonOptions: {
            theme: {
                states: {
                    hover: {
                        fill: brandColor(0.1),
                        stroke: brandColor(0.1),
                    },
                },
            },
        },
    },
    noData: {
        style: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: brandColor(0.5),
        },
    },
    lang: {
        noData: 'Chart data not available for this asset',
    },
});

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
