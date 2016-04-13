import { expect } from 'chai';
import { strTimePlusDayAsEpoch } from '../updateTradingTimes';

describe('strTimePlusDayAsEpoch', () => {
    it('same if 00', () => {
        const day = new Date(2020, 1, 1);
        const originalEpoch = Math.floor(day.getTime() / 1000);
        const expectedEpoch = strTimePlusDayAsEpoch(day, '00:00:00');

        expect(originalEpoch).to.equal(expectedEpoch);
    });

    it('string is 24hr', () => {
        const day = new Date(2020, 1, 1);
        const targetEpoch = Math.floor(day.getTime() / 1000) + (15 * 60 * 60) + (10 * 60);
        const expectedEpoch = strTimePlusDayAsEpoch(day, '15:10:00');

        expect(targetEpoch).to.equal(expectedEpoch);
    });

    it('max is 23', () => {
        const day = new Date(2020, 1, 1);
        const targetEpoch = Math.floor(day.getTime() / 1000) + (24 * 60 * 60) - 1;
        const expectedEpoch = strTimePlusDayAsEpoch(day, '23:59:59');

        expect(targetEpoch).to.equal(expectedEpoch);
    });
});
