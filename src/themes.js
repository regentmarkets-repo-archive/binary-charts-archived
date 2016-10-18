// $FlowFixMe
import Highcharts from 'highcharts/highstock.src';
import { colorBg, colorText } from './styles';

function merge(a: Object, b: Object) {
    if (process.env.NODE_ENV !== 'production') {
        return a;
    }
    return Highcharts.merge(a, b);
}

const red = (alpha: number) => `rgba(204, 0, 51, ${alpha})`;
const green = (alpha: number) => `rgba(46, 136, 54, ${alpha})`;

const downColor = (theme, contrast) => contrast ? colorBg(theme, 1) : red(1);
const downFill = (theme, contrast) => contrast ? colorText(theme, 1) : red(0.75);
const upColor = (theme, contrast) => contrast ? colorBg(theme, 1) : green(1);
const upFill = (theme, contrast) => contrast ? colorBg(theme, 1) : green(0.75);

const themeColors = (theme: Theme, highContrast: boolean): Object => ({
    spacing: [100, 10, 15, 10],
    plotOptions: {
        line: {
            color: colorBg(theme, 1),
        },
        area: {
            color: colorBg(theme, 1),
        },
        ohlc: {
            color: downColor(theme, highContrast),
            upColor: upColor(theme, highContrast),
        },
        candlestick: {
            color: downFill(theme, highContrast),
            lineColor: downColor(theme, highContrast),
            upColor: upFill(theme, highContrast),
            upLineColor: upColor(theme, highContrast),
        },
    },
    xAxis: {
		gridLineColor: colorBg(theme, 0.25),
        labels: {
			style: {
				color: colorBg(theme, 0.75),
			},
		},
		lineColor: colorBg(theme, 0.25),
		title: {
			style: {
                color: colorBg(theme, 0.75),
			},
		},
	},
    yAxis: {
        gridLineColor: colorBg(theme, 0.2),
		labels: {
			style: {
				color: colorBg(theme, 0.75),
			},
		},
		tickColor: colorBg(theme, 0.2),
		title: {
			style: {
				color: colorBg(theme, 0.75),
			},
		},
	},
    noData: {
        style: {
            color: colorBg(theme, 0.5),
        },
    },
});

const commonTheme = {
    chart: {
		style: {
			fontFamily: "'Roboto', sans-serif",
		},
		backgroundColor: 'transparent',
        resetZoomButton: {
            theme: {
                display: 'none',
            },
        },
    },
    plotOptions: {
        series: {
            states: {
                hover: {
                    lineWidth: 1.5,
                },
            },
        },
        area: {
            lineWidth: 1.5,
        },
        ohlc: {
            lineWidth: 1.5,
        },
        candlestick: {
            lineWidth: 1.5,
        },
    },
    xAxis: {
        labels: {
            y: 15,
        },
    },
	yAxis: {
		tickWidth: 1,
	},
    noData: {
        style: {
            fontSize: '20px',
            fontWeight: 'bold',
        },
    },
    lang: {
        noData: 'Data not available',
    },
};

export default (theme, highContrast) =>
    merge(
        commonTheme,
        themeColors(theme, highContrast),
    );
