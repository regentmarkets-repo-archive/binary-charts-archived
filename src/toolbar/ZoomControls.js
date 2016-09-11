import React, { PureComponent } from 'react';
import Add from 'react-material-design-icons/icons/Add';
import Remove from 'react-material-design-icons/icons/Remove';
import ChevronLeft from 'react-material-design-icons/icons/ChevronLeft';
import ChevronRight from 'react-material-design-icons/icons/ChevronRight';
import LastPage from 'react-material-design-icons/icons/LastPage';
import Refresh from 'react-material-design-icons/icons/Refresh';
import styles from '../styles';

export default class ZoomControls extends PureComponent {

    props: {
        getData?: (duration: Epoch, type: 'ticks' | 'candles', interval?: Epoch) => void,
        getXAxis: () => any,
        getSeries: () => any,
    };

    moveOffset = (direction: number): void => {
        const xAxis = this.props.getXAxis();
        const step = (xAxis.max - xAxis.min) / 10 * direction;
        xAxis.setExtremes(xAxis.min + step, xAxis.max + step, true);
    }

    moveLeft = () => this.moveOffset(-1);

    moveRight = () => this.moveOffset(1);

    // decrease visible data by half
    zoomIn = () => {
        const xAxis = this.props.getXAxis();
        const halfDiff = (xAxis.max - xAxis.min) / 2;
        xAxis.setExtremes(xAxis.min + halfDiff, xAxis.max, true);
    }

    reset = () => {
        const xAxis = this.props.getXAxis();
        xAxis.setExtremes(xAxis.dataMin, xAxis.DataMax, true);
    }

    // increase visible data to it's double
    zoomOut = () => {
        const xAxis = this.props.getXAxis();
        const diff = xAxis.max - xAxis.min;
        const newMin = xAxis.min - diff;
        xAxis.setExtremes(newMin < xAxis.dataMin ? xAxis.DataMin : newMin, xAxis.max, true);
    }

    moveToEnd = () => {
        const xAxis = this.props.getXAxis();
        const diff = xAxis.max - xAxis.min;
        xAxis.setExtremes(xAxis.dataMax - diff, xAxis.dataMax, true);
    }

    render() {
        return (
            <span style={styles.zoomControls} className="binary-chart-zoom-controls">
                <div style={styles.zoomSpacer} />
                <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.moveLeft}>
                    <ChevronLeft />
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
                    <a style={styles.zoomButton} className="binary-chart-zoom-button" onClick={this.moveToEnd}>
                        <LastPage />
                    </a>
                </div>
            </span>
        );
    }
}
