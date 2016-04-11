import brandColor from 'binary-utils/lib/brandColor';

export default ({
    colors: [brandColor(1)],
    series: [{
        lineWidth: 1,
    }],
    chart: {
		style: {
			fontFamily: "'Roboto', sans-serif",
		},
		plotBorderColor: 'red',
	},
    xAxis: {
		gridLineColor: 'rgba(42, 48, 82, .2)',
        labels: {
			style: {
				color: brandColor(0.75),
			},
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#2a3052',
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
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#2a3052',
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
