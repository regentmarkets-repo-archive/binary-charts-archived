const brand = percentage => `rgba(42, 48, 82, ${percentage})`;

export default ({
    colors: ["#2a3052", "red", "green", "blue", "yellow"],
    series: [{
        lineWidth: 1
    }],
    chart: {
		style: {
			fontFamily: "'Roboto', sans-serif"
		},
		plotBorderColor: 'red'
	},
    xAxis: {
		gridLineColor: 'rgba(42, 48, 82, .2)',
        labels: {
			style: {
				color: brand(.75)
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#2a3052'
			}
		}
	},
	yAxis: {
        gridLineColor: brand(.2),
		labels: {
			style: {
				color: brand(.75)
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#2a3052'
			}
		}
	},
    labels: {
        style: {
            color: 'red'
        }
    },
    navigator: {
		handles: {
			backgroundColor: brand(.25),
			borderColor: brand(.5),
		},
		outlineColor: 'none',
		maskFill: brand(.1),
		series: {
			color: brand(.25),
			lineColor: brand(.25)
		},
		xAxis: {
			gridLineColor: brand(.1),
            labels: {
                style: {
                    color: brand(.75)
                }
            }
		}
	},
    rangeSelector: {
		buttonTheme: {
			fill: 'none',
			stroke: 'none',
			style: {
				color: brand(1)
			},
			states: {
				hover: {
					fill: 'red',
					stroke: 'green',
					style: {
                        borderBottom: '1px solid red',
					}
				},
				select: {
					style: {
						borderBottom: '1px solid red',
					}
				}
			}
		}
	},
});

// #2a3052
// rgba(42, 48, 82, 1)

const dark = {

	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
		style: {
			color: '#F0F0F0'
		}
	},
	plotOptions: {
		series: {
			dataLabels: {
				color: '#B0B0B3'
			},
			marker: {
				lineColor: '#333'
			}
		},
		boxplot: {
			fillColor: '#505053'
		},
		candlestick: {
			lineColor: 'white'
		},
		errorbar: {
			color: 'white'
		}
	},
	labels: {
		style: {
			color: '#707073'
		}
	},

	drilldown: {
		activeAxisLabelStyle: {
			color: '#F0F0F3'
		},
		activeDataLabelStyle: {
			color: '#F0F0F3'
		}
	},

    navigation: {
        buttonOptions: {
            symbolStroke: '#DDDDDD',
            theme: {
                fill: '#505053'
            }
        }
    },


	// special colors for some of the
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};
