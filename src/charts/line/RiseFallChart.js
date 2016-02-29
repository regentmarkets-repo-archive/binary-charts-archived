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

const createLegendForContracts = (contracts) => {
    const legendData = contracts.map(c => ({
        name: c.id,
    }));

    return {
        data: legendData
    };
};

export default class RiseFallChart extends Component {
    static defaultProps = {
        title: 'Rise/Fall Chart',
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array,
        symbol: PropTypes.string,
        contracts: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            entry: PropTypes.array.isRequired,
            exit: PropTypes.array,
        })),
        xOffsetPercentage: PropTypes.number,
        yOffsetPercentage: PropTypes.number,
    };

    static entryPointFormatter = (params) => {
        const value = params.data[0].coord;
        return `Enter Time: ${value[0]}`;
    };
    static exitPointFormatter = (params) => {
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
        const {data, contracts, title, symbol, xOffsetPercentage, yOffsetPercentage} = this.props;

        if (!data) {
            return;
        }

        const xOffset = dataUtil.getXBoundaryInValue(data, xOffsetPercentage);
        const yOffset = dataUtil.getYBoundaryInValue(data, yOffsetPercentage);

        const xMin = xOffset[0];
        const xMax = xOffset[1];
        const yMin = yOffset[0];
        const yMax = yOffset[1];

        const currentSpot = data[data.length - 1];
        const currentSpotData = [[xMin, currentSpot[1]], [xMax, currentSpot[1]]];

        const allContractsLegend = createLegendForContracts(contracts);

        const allContractsSeries = contracts.map(c => {
            const entry = c.entry;
            const exit = c.exit;
            const entrySpotData = entry && [[xMin, entry[1]], [xMax, entry[1]]];
            const contractFrameData = createContractFrame(currentSpot, entry, exit, xMin, xMax, yMin, yMax);

            const contractFrameSeries = contractFrameData && lineData.createSeriesAsLine(c.id, contractFrameData);
            const entrySpotSeries = entrySpotData && lineData.createSeriesAsLine(c.id, entrySpotData);

            const labeledEntrySpotSeries = rfDecorators.decorateHorizontalLineSeries(entrySpotSeries);
            const styledContractFrame = rfDecorators.decorateContractFrame(contractFrameSeries);
            return [labeledEntrySpotSeries, styledContractFrame];
        });

        // convert to series
        const dataSeries = data && lineData.createSeriesAsLine(symbol, data);
        const currentSpotSeries = lineData.createSeriesAsLine('Current Spot', currentSpotData);

        // decorate with style
        const dataSeriesWithAreaStyle = lineData.decorateSeriesWithAreaStyle(dataSeries);
        const labeledCurrentSpotSeries = rfDecorators.decorateCurrentSpotLine(currentSpotSeries);


        let series = [];
        if (dataSeries) series.push(dataSeriesWithAreaStyle);
        if (allContractsSeries.length > 0) {
            allContractsSeries.forEach(sr => {
                series = series.concat(sr);
            });
        }

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
                legend={allContractsLegend}
            />
        );
    }
}
