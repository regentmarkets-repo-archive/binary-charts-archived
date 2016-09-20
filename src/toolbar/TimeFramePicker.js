import React, { PureComponent } from 'react';
import { getLast } from 'binary-utils';
import styles from '../styles';

const options = [
    { text: '5m', seconds: 5 * 60 },
    { text: '15m', seconds: 15 * 60 },
    { text: '1h', seconds: 60 * 60 },
    { text: '3h', seconds: 3 * 60 * 60 },
    { text: '12h', seconds: 12 * 60 * 60 },
    { text: '1d', seconds: 24 * 60 * 60 },
    { text: '1w', seconds: 7 * 24 * 60 * 60 },
    { text: '30d', seconds: 30 * 25 * 60 * 60 },
];

export default class TimeFramePicker extends PureComponent {

    props: {
        data: Tick[],
        getChart: () => Chart,
        getData?: (start: Epoch, end: Epoch) => void,
        getXAxis: () => any,
        getSeries: () => any,
        interval?: number,
        showAllTimeFrame: boolean,
    };

    static defaultProps = {
        maxTimeRange: 7 * 24 * 60 * 60,         // default allow to 1 week
    };

    setRange = (fromDistance: seconds) => {
        const { getSeries, getXAxis, getChart } = this.props;
        const series = getSeries();
        const xAxis = getXAxis();
        const chart = getChart();
        const { min, max } = xAxis.getExtremes();
        const futureSeries = chart.get('future');

        const end = max;
        let start = max - (fromDistance * 1000);
        if (futureSeries) {
            const futureX = futureSeries.options.data[0][0];
            if (futureX <= max) {
                const lastDataX = getLast(series.options.data)[0];
                start = lastDataX - (fromDistance * 1000);
            }
        }

        const firstDataX = series.options.data[0][0];
        const dataDiff = start - firstDataX;

        if (dataDiff < 0) {
            const result = this.props.getData(Math.round(start / 1000), Math.round(firstDataX / 1000));
            if (result.then) {
                result.then((data) => {
                    if (!data || data.length === 0) {
                        xAxis.setExtremes(min, end, true, false);
                        return;
                    }

                    const smallestDataInMillis = (data[0].epoch) * 1000;
                    const closestToStart = smallestDataInMillis < start ? start : smallestDataInMillis;
                    xAxis.setExtremes(closestToStart, end, true, false);
                });
            }
        } else {
            xAxis.setExtremes(start, end, true, false);
        }
    };

    setRangeToMax = () => {
        const xAxis = this.props.getXAxis();
        const { dataMin, dataMax } = xAxis.getExtremes();
        xAxis.setExtremes(dataMin, dataMax, true, false);
    }

    render() {
        const { data, showAllTimeFrame, interval } = this.props;

        let opt = options;

        if (data.length > 0) {
            const max = getLast(data).epoch;
            const min = data[0].epoch;

            if (!showAllTimeFrame) {
                opt = options.filter(o => o.seconds <= max - min);
            } else if (!interval) {        // tick data
                opt = options.filter(o => o.seconds <= max - min + 1000);       // TODO: 1000 is arbritary
            } else {
                opt = options.filter(o => o.seconds <= (max - min) + (interval * 500));     // TODO: 500 is arbritary
            }
        }

        return (
            <div style={styles.timeFramePicker} className="binary-chart-time-frame-picker">
                {opt.map(x =>
                    <button
                        key={x.text}
                        style={styles.timeFrameButton}
                        onClick={() => this.setRange(x.seconds)}
                    >
                        {x.text}
                    </button>
                )}
                <button style={styles.timeFrameButton} onClick={this.setRangeToMax}>Max</button>
            </div>
        );
    }
}
