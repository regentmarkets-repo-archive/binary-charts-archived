import { expect } from 'chai';
import { createXAxis, createYAxis } from '../Axis';

describe('Axis model', () => {
    it('should create default working xAxis', () => {
        const defaultX = createXAxis('Test');

        expect(defaultX).to.have.property('name', 'Test');
        expect(defaultX).to.have.deep.property('type', 'value');
        expect(defaultX).to.have.deep.property('axisLine.lineStyle.width', '1');
    });

    it('should create default working yAxis', () => {
        const defaultY = createYAxis('Test');

        expect(defaultY).to.have.property('name', 'Test');
        expect(defaultY).to.have.deep.property('position', 'right');
        expect(defaultY).to.have.deep.property('axisLine.lineStyle.width', '1');
    });
});
