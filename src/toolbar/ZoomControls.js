import React, { PureComponent } from 'react';
import { getLast } from 'binary-utils';
import { AddIcon, RemoveIcon, ChevronLeftIcon, ChevronRightIcon, LastPageIcon, FitAllIcon } from '../icons';
import ZoomButton from './ZoomButton';
import defaultTooltips from '../tooltips';
import styles from '../styles';
import { computeMinRange } from '../config/updateMinRange';

export default class ZoomControls extends PureComponent {

    props: {
        endButtonShown: boolean,
        showTooltips: boolean,
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

        const series = getSeries();
        const seriesLastData = getLast(series.options.data);

        const futureSeries = chart.get('future');
        const futureX = futureSeries && futureSeries.options.data[8][0];    // todo: index 8 is hardcoded

        const frameSize = max - min;
        const step = frameSize / 5 * direction;

        const forward = direction > 0;

        const currentFrameHasFutureData = futureSeries && futureX <= max;

        let start;
        let end;
        if (forward) {
            if (max === dataMax) {      // ignore when frame already at max
                return;
            }

            if (currentFrameHasFutureData) {        // ignore if future data already exists
                return;
            }

            const expectedNextMax = Math.min(dataMax, max + step);
            const expectedNextMin = expectedNextMax - frameSize;
            const nextFrameHasFutureData = expectedNextMax > seriesLastData[0];

            if (nextFrameHasFutureData) {
                start = expectedNextMin;

                // directly use data max if nextframe has future data, as we always want to show all or none future data
                end = dataMax;
            } else {
                start = expectedNextMin;
                end = expectedNextMax;
            }
        } else {
            let requestedMin = min + step;

            if (currentFrameHasFutureData) {
                const frameSizeWithoutFuture = seriesLastData[0] - min;
                const stepWithoutFuture = frameSizeWithoutFuture / 5 * direction;
                requestedMin = min + stepWithoutFuture;
                end = seriesLastData[0];

                if (requestedMin < dataMin) {
                    start = min;
                } else {
                    start = Math.max(requestedMin, dataMin);
                }

                // when moving from view with future data to view without future data
                // minrange need to be recompute
                xAxis.update({ minRange: computeMinRange(chart, { min: start, max: end }) });
            } else if (requestedMin < dataMin) {
                start = min;
                end = max;
            } else {
                start = Math.max(dataMin, requestedMin);
                end = start + frameSize;
            }

            if (requestedMin < dataMin) {
                const startEpoch = Math.round(requestedMin / 1000);
                const endEpoch = Math.round(dataMin / 1000);
                getData(startEpoch, endEpoch).then((data) => {
                    if (!data || data.length === 0) {
                        xAxis.setExtremes(min, end, true);
                        return;
                    }

                    const smallestDataInMillis = (data[0].epoch) * 1000;
                    const closestToStart = smallestDataInMillis < requestedMin ? requestedMin : smallestDataInMillis;
                    xAxis.setExtremes(closestToStart, end, true);
                });
            }
        }

        if (start === min && end === max) {
            return;
        }
        xAxis.setExtremes(start, end, true);
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
            const futureX = futureSeries.options.data[8][0];        // todo: hardcoded index 8
            if (futureX <= max) {
                const series = getSeries();
                const lastDataX = getLast(series.options.data)[0];
                halfDiff = (lastDataX - min) / 2;
            }
        }

        xAxis.setExtremes(min + halfDiff, max, true);
    }

    resetZoom = () => {
        const xAxis = this.props.getXAxis();
        const { dataMin, dataMax } = xAxis.getExtremes();
        xAxis.setExtremes(dataMin, dataMax, true);
    }

    // increase visible data to it's double
    zoomOut = () => {
        const series = this.props.getSeries();
        const xAxis = this.props.getXAxis();
        const { dataMin, min, max } = xAxis.getExtremes();
        const realMax = Math.min(max, getLast(series.options.data)[0]);
        const diff = realMax - min;
        const newMin = Math.max(dataMin, min - diff);
        xAxis.setExtremes(newMin, max, true);
    }

    moveToEnd = () => {
        const { getChart, getSeries, getXAxis } = this.props;
        const chart = getChart();
        const xAxis = getXAxis();
        const { dataMax, min, max } = xAxis.getExtremes();
        const futureSeries = chart.get('future');

        let movedRange = dataMax - max;

        if (futureSeries) {
            const series = getSeries();
            const lastDataX = getLast(series.options.data)[0];

            if (max > lastDataX) {
                movedRange = 0;
            } else {
                // exclude future empty data in calculation
                movedRange -= (dataMax - lastDataX);
            }
        }
        xAxis.setExtremes(min + movedRange, dataMax, true);
    }

    render() {
        const { endButtonShown, showTooltips } = this.props;
        const tooltips = showTooltips ? defaultTooltips : {};

        return (
            <span style={styles.zoomControls} className="binary-chart-zoom-controls">
                <div style={styles.zoomSpacer} />
                <ZoomButton img={<ChevronLeftIcon />} onClick={this.moveLeft} tooltip={tooltips.moveLeft} />
                <ZoomButton img={<RemoveIcon />} onClick={this.zoomOut} tooltip={tooltips.zoomOut} />
                <ZoomButton img={<FitAllIcon />} onClick={this.resetZoom} tooltip={tooltips.resetZoom} />
                <ZoomButton img={<AddIcon />} onClick={this.zoomIn} tooltip={tooltips.zoomIn} />
                <ZoomButton img={<ChevronRightIcon />} onClick={this.moveRight} tooltip={tooltips.moveRight} />
                <div style={styles.zoomSpacer}>
                    {endButtonShown &&
                        <ZoomButton img={<LastPageIcon />} onClick={this.moveToEnd} tooltip={tooltips.moveToEnd} />
                    }
                </div>
            </span>
        );
    }
}
