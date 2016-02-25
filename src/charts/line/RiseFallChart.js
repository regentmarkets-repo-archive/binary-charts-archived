import React, { Component, PropTypes } from 'react';
import * as ld from '../../model/LineData';
import {createTitle} from '../../model/Title';
import {createXAxis, createYAxis} from '../../model/Axis';
import BaseChart from '../../BaseChart';
import * as dataUtil from '../../utils/DataUtils';

export default class RiseFallChart extends Component {
    static defaultProps = {
        title: 'Rise/Fall Chart',
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array,
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
        const {data, contractEntry, contractExit, title, xOffsetPercentage, yOffsetPercentage} = this.props;

        if (!data) {
            return;
        }

        const xOffset = dataUtil.getXBoundaryInValue(data, 0.1);
        const yOffset = dataUtil.getYBoundaryInValue(data, 0.1);

        const entryTimeLine = contractEntry &&
            {
                from: [contractEntry[0], yOffset[0]],
                to: [contractEntry[0], yOffset[1]],
                name: 'Entry Time',
                formatter: RiseFallChart.entryPointFormatter
            };
        const exitTimeLine = contractExit &&
            {
                from: [contractExit[0], yOffset[0]],
                to: [contractExit[0], yOffset[1]],
                name: 'Exit Time',
                formatter: RiseFallChart.exitPointFormatter
            };

        const entrySpotLine = contractEntry && {
            from: [xOffset[0], contractEntry[1]],
            to: [xOffset[1], contractEntry[1]],
            name: 'Entry price',
            formatter: RiseFallChart.entryPriceFormatter
        };

        const series = (data && contractEntry) &&
            ld.createSeriesAsLine('series name', data, [entrySpotLine, entryTimeLine, exitTimeLine]);

        const tt = createTitle(title);

        const xAxis = Object.assign({ min: xOffset[0], max: xOffset[1]}, createXAxis('Time'));
        const yAxis = Object.assign({ min: yOffset[0], max: yOffset[1]}, createYAxis('Spot'));

        return (
            series ?
                <BaseChart
                    title={tt}
                    series={[series]}
                    xAxis={xAxis}
                    yAxis={yAxis}
                /> :
                <BaseChart
                    title={tt}
                    xAxis={xAxis}
                    yAxis={yAxis}
                />
        );
    }
}
