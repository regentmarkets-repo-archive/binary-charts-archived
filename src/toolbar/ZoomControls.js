import React, { PureComponent } from 'react';
import { getLast } from 'binary-utils';
import Add from 'react-material-design-icons/icons/Add';
import Remove from 'react-material-design-icons/icons/Remove';
import ChevronLeft from 'react-material-design-icons/icons/ChevronLeft';
import ChevronRight from 'react-material-design-icons/icons/ChevronRight';
import LastPage from 'react-material-design-icons/icons/LastPage';
import Refresh from 'react-material-design-icons/icons/Refresh';
import styles from '../styles';

export default class ZoomControls extends PureComponent {

    props: {
        endButtonShown: boolean,
        getChart: () => Chart,
        getData?: (start: Epoch, end: Epoch) => void,
        getXAxis: () => any,
        getSeries: () => any,
    };

    moveOffset = (direction: number): void => {
        const { getData, getXAxis, getSeries, getChart } = this.props;
        const chart = getChart();
        const xAxis = getXAxis();
        const { min, max, dataMin, dataMax } = xAxis.getExtremes();
        const futureSeries = chart.get('future');
        const frameSize = max - min;

        let step = frameSize / 10 * direction;

        if (futureSeries) {
            const futureX = futureSeries.options.data[0][0];
            if (futureX <= max) {
                const series = getSeries();
                const lastDataX = getLast(series.options.data)[0];
                step = (lastDataX - min) / 10 * direction;
            }
        }

        const newMin = min + step;

        let start;
        let end;
        if (direction > 0) {
            end = Math.min(dataMax, max + step);
            start = end - frameSize;
        } else {
            start = Math.max(dataMin, newMin);
            end = start + frameSize;
        }

        xAxis.setExtremes(start, end, true);

        if (newMin < dataMin) {
            const startEpoch = Math.round(newMin / 1000);
            const endEpoch = Math.round(dataMin / 1000);
            getData(startEpoch, endEpoch).then((data) => {
                if (!data || data.length === 0) {
                    xAxis.setExtremes(min, end, true);
                    return;
                }

                const smallestDataInMillis = (data[0].epoch) * 1000;
                const closestToStart = smallestDataInMillis < newMin ? newMin : smallestDataInMillis;
                xAxis.setExtremes(closestToStart, end, true);
            });
        }
    }

    moveLeft = () => this.moveOffset(-1);

    moveRight = () => this.moveOffset(1);

    // decrease visible data by half
    zoomIn = () => {
        const { getChart, getSeries, getXAxis } = this.props;
        const chart = getChart();
        const xAxis = getXAxis();
        const { min, max } = xAxis.getExtremes();
        const futureSeries = chart.get('future');

        let halfDiff = (max - min) / 2;

        if (futureSeries) {
            const futureX = futureSeries.options.data[0][0];
            if (futureX <= max) {
                const series = getSeries();
                const lastDataX = getLast(series.options.data)[0];
                halfDiff = (lastDataX - min) / 2;
            }
        }

        xAxis.setExtremes(min + halfDiff, max, true);
    }

    reset = () => {
        const xAxis = this.props.getXAxis();
        const { dataMin, dataMax } = xAxis.getExtremes();
        xAxis.setExtremes(dataMin, dataMax, true);
    }

    // increase visible data to it's double
    zoomOut = () => {
        const xAxis = this.props.getXAxis();
        const { dataMin, min, max } = xAxis.getExtremes();
        const diff = max - min;
        const newMin = Math.max(dataMin, min - diff);
        xAxis.setExtremes(newMin, max, true);
    }

    moveToEnd = () => {
        const { getChart, getSeries, getXAxis } = this.props;
        const chart = getChart();
        const xAxis = getXAxis();
        const { dataMax, min, max } = xAxis.getExtremes();
        const futureSeries = chart.get('future');

        let diff = max - min;

        if (futureSeries) {
            const futureX = futureSeries.options.data[0][0];
            if (futureX <= max) {
                const series = getSeries();
                const lastDataX = getLast(series.options.data)[0];
                diff = (lastDataX - min);
            }
        }

        xAxis.setExtremes(dataMax - diff, dataMax, true);
    }

    render() {
        const { endButtonShown } = this.props;
        return (
            <span style={styles.zoomControls} className="binary-chart-zoom-controls">
                <div style={styles.zoomSpacer} />
                <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.moveLeft}>
                    <ChevronLeft width={24} height={24} />
                </a>
                <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.zoomOut}>
                    <Remove />
                </a>
                <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.reset}>
                    <Refresh />
                </a>
                <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.zoomIn}>
                    <Add />
                </a>
                <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.moveRight}>
                    <ChevronRight />
                </a>
                <div style={styles.zoomSpacer}>
                    {endButtonShown && <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.moveToEnd}>
                        <LastPage />
                    </a>}
                </div>
            </span>
        );
    }
}
