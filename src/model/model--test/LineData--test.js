import { expect } from 'chai';
import * as l from '../LineData';

describe('LineData', () => {
    "use strict";

    const randomNum = () => Math.random() * (20 - 10) + 10;
    const testData = [
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()],
        [randomNum(), randomNum()]
    ];

    it('should create label for last data', () => {
        const lineData = l.createLineData(testData);
        expect(lineData).to.have.length(testData.length);
        expect(lineData[lineData.length - 1]).to.have.deep.property('value');
        expect(lineData[lineData.length - 1]).to.have.deep.property('label.normal.show', true);
    });

    it('should create default working series data', () => {
        const barriers = [
            { from: randomNum(), to: randomNum(), name: 'halo', formatter: 'formatter'}
        ];
        const points = [
            { at: randomNum(), name: 'halo', formatter: 'formatter'}
        ];
        const series = l.createSeriesAsLine('Test', testData, barriers, points);

        expect(series).to.have.deep.property('type', 'line');
        expect(series).to.have.deep.property('markPoint.label.normal.formatter', 'formatter');
    });
});
