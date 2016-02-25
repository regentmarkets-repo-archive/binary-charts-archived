import BaseChart from './BaseChart';
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

const staticChartTitle = createTitle('Static base chart');
const dynamicChartTitle = createTitle('Dynamic base chart');

ReactDOM.render(<BaseChart title={staticChartTitle} series={[series]} />, document.getElementById('base-chart'));

const chartUpdate = (d = testData) => window.setTimeout(() => {
    "use strict";
    const updatedSeries = createSeriesAsLine('Test', d, barriers, points);
    ReactDOM.render(
        <BaseChart
            title={dynamicChartTitle}
            series={[updatedSeries]}
            dataZoom={[createSlideInside(), createZoomSlider()]}
        />, document.getElementById('dynamic-base-chart'));
    const lastData = d[d.length - 1];
    const newData = d.concat([[lastData[0] + 2, randomNum()]]);
    chartUpdate(newData);
}, 1000);

chartUpdate();
