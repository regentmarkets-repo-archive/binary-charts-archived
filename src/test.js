import BaseChart from './charts/BaseChart';
import RiseFallChart from './charts/line/RiseFallChart';
import ReactDOM from 'react-dom';
import React from 'react';
import { createSeriesAsLine } from './model/LineData';
import {createTitle} from './model/Title';
import { createZoomSlider, createSlideInside } from './model/DataZoom';

const randomNum = () => Math.floor(Math.random() * (20 - 10) + 10);
const testData = [
    [2, randomNum()],
    [4, randomNum()],
    [6, randomNum()],
    [8, randomNum()],
    [9, randomNum()],
    [10, randomNum()],
    [11, randomNum()],
    [15, randomNum()],
    [19, randomNum()],
    [20, randomNum()],
    [26, randomNum()]
];

const barriers = [
    { from: [3, randomNum()], to: [18, randomNum()], name: 'halo', formatter: 'formatter'}
];
const points = [
    { at: [10, randomNum()], name: 'halo', formatter: 'formatter'}
];
const series = createSeriesAsLine('Test', testData, barriers, points);

/********************
 * Base Chart Start *
 * ******************/
const staticChartTitle = createTitle('Static base chart');
const dynamicChartTitle = createTitle('Dynamic base chart');

ReactDOM.render(<BaseChart className="chart" title={staticChartTitle} series={[series]} />, document.getElementById('base-chart'));

const dynamicBaseChart = (d = testData) => window.setTimeout(() => {
    "use strict";
    const lastData = d[d.length - 1];
    let newData;
    if (d.length > 20) {
        newData = d.slice(1);
        newData.push([lastData[0] + 2, randomNum()]);
    } else {
        newData = d.concat([[lastData[0] + 2, randomNum()]]);
    }
    const updatedSeries = createSeriesAsLine('Test', newData, barriers, points);
    ReactDOM.render(
        <BaseChart
            className="chart"
            title={dynamicChartTitle}
            series={[updatedSeries]}
        />, document.getElementById('dynamic-base-chart'));
    dynamicBaseChart(newData);
}, 1500);

dynamicBaseChart();

/********************
 * Base Chart End *
 * ******************/


/*************************
 * Rise Fall Chart Start *
 * ***********************/
const riseFallTitle = 'Rise fall chart';
const entry = [10, randomNum()];
const exit = [20, randomNum()];

const contracts = [{
    id: 'C1',
    entry,
    exit
}];

ReactDOM.render(
    <RiseFallChart
        className="chart"
        title={riseFallTitle}
        data={testData}
        contracts={contracts}
        symbol="Random 100"
        xOffsetPercentage={0.1}
        yOffsetPercentage={2}
    />,
    document.getElementById('rise-fall-chart')
);

const dynamicRiseFallChart = (d = testData) => window.setTimeout(() => {
    const lastData = d[d.length - 1];
    let newData;
    if (d.length > 60) {
        newData = d.slice(1);
        newData.push([lastData[0] + 2, randomNum()]);
    } else {
        newData = d.concat([[lastData[0] + 2, randomNum()]]);
    }
    ReactDOM.render(
        <RiseFallChart
            className="resizable-chart"
            title="Dynamic Rise Fall"
            data={newData}
            contracts={contracts}
            symbol="Random 100"
            xOffsetPercentage={0.05}
            yOffsetPercentage={2}
        />,
        document.getElementById('dynamic-rise-fall-chart')
    );
    dynamicRiseFallChart(newData);
}, 1500);

dynamicRiseFallChart();

/*************************
 * Rise Fall Chart End *
 * ***********************/
