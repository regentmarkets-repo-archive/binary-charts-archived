import React, { Component, PropTypes } from 'react';
import * as lineData from '../../model/LineData';
import {createTitle} from '../../model/Title';
import {createXAxis, createYAxis} from '../../model/Axis';
import {createTooltip} from '../../model/Tooltip';
import BaseChart from '../../BaseChart';
import * as dataUtil from '../../utils/DataUtils';
import * as rfDecorators from './RiseFallChartDecorators';

const riseFallToolTip = createTooltip('mousemove', 'axis', (params) => {
    "use strict";
    const param0 = params[0];
    const seriesName = param0.seriesName;
    const value = param0.value;
    return `${seriesName}<br />Time: ${value[0]}<br />Spot:${value[1]}`;
});

const createContractFrame = (current, entry, exit, xMin, xMax, yMin, yMax) => {
    if (!entry) return undefined;
    const frameStartData = [[entry[0], yMin], [entry[0], yMax]];
    const frameEndData = exit ? [[exit[0], yMax], [exit[0], yMin]] : [[current[0], yMax], [current[0], yMin]];

    return frameStartData.concat(frameEndData.concat([frameStartData[0]]));
};

export default class RiseFallChart extends Component {
    static defaultProps = {
        title: 'Rise/Fall Chart',
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array,
        symbol: PropTypes.string,
        contractEntry: PropTypes.array,
        contractExit: PropTypes.array,
        xOffsetPercentage: PropTypes.number,
        yOffsetPercentage: PropTypes.number,
    };

    static entryPointFormatter = (params) => {
        console.log('ent', params);
        const value = params.data[0].coord;
        return `Enter Time: ${value[0]}`;
    };
    static exitPointFormatter = (params) => {
        console.log('exit', params);
        const idx = params.dataIndex;
        const value = params.data[0].coord;
        return `Exit Time: ${value[0]}`;
    };
    static entryPriceFormatter = (params) => {
        const value = params.data[0].coord;
        return `Enter Price: ${value[1]}`;
    };

    updateXMinMax(xMin, xMax) {
        this.seState({xMin, xMax});
    }

    render() {
        const {data, contractEntry, contractExit, title, symbol, xOffsetPercentage, yOffsetPercentage} = this.props;

        if (!data) {
            return;
        }

        const xOffset = dataUtil.getXBoundaryInValue(data, xOffsetPercentage);
        const yOffset = dataUtil.getYBoundaryInValue(data, yOffsetPercentage);

        const xMin = xOffset[0];
        const xMax = xOffset[1];
        const yMin = yOffset[0];
        const yMax = yOffset[1];

        const entrySpotData = contractEntry && [[xMin, contractEntry[1]], [xMax, contractEntry[1]]];

        const currentSpot = data[data.length - 1];
        const currentSpotData = [[xMin, currentSpot[1]], [xMax, currentSpot[1]]];

        const contractFrameData = createContractFrame(currentSpot, contractEntry, contractExit, xMin, xMax, yMin, yMax);

        const dataSeries = data && lineData.createSeriesAsLine(symbol, data);
        const contractFrameSeries = contractFrameData && lineData.createSeriesAsLine('Contract', contractFrameData);
        const entrySpotSeries = entrySpotData && lineData.createSeriesAsLine('Entry Spot', entrySpotData);
        const currentSpotSeries = lineData.createSeriesAsLine('Current Spot', currentSpotData);

        const dataSeriesWithAreaStyle = lineData.decorateSeriesWithAreaStyle(dataSeries);
        const labeledEntrySpotSeries = rfDecorators.decorateHorizontalLineSeries(entrySpotSeries);
        const labeledCurrentSpotSeries = rfDecorators.decorateCurrentSpotLine(currentSpotSeries);
        const styledContractFrame = rfDecorators.decorateContractFrame(contractFrameSeries);

        const series = [];
        if (dataSeries) series.push(dataSeriesWithAreaStyle);
        if (contractFrameSeries) series.push(styledContractFrame);
        if (entrySpotSeries) series.push(labeledEntrySpotSeries);

        series.push(labeledCurrentSpotSeries);

        const tt = createTitle(title);

        const xAxis = Object.assign({ min: xOffset[0], max: xOffset[1]}, createXAxis('Time'));
        const yAxis = Object.assign({ min: yOffset[0], max: yOffset[1]}, createYAxis('Spot'));

        return (
            <BaseChart
                title={tt}
                series={series}
                xAxis={xAxis}
                yAxis={yAxis}
                tooltip={riseFallToolTip}
            />
        );
    }
}
