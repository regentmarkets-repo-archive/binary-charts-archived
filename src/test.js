import BaseChart from './BaseChart';
import ReactDOM from 'react-dom';
import React from 'react';
import { createSeriesAsLine } from './model/LineData';

const randomNum = () => Math.random() * (20 - 10) + 10;
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
    { from: randomNum(), to: randomNum(), name: 'halo', formatter: 'formatter'}
];
const points = [
    { at: randomNum(), name: 'halo', formatter: 'formatter'}
];
const series = createSeriesAsLine('Test', testData, barriers, points);

ReactDOM.render(<BaseChart series={[series]} />, document.getElementById('example'));