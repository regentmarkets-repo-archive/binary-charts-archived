import { expect } from 'chai';
import { strTimePlusDayAsEpoch } from '../updateTradingTimes';

describe('strTimePlusDayAsEpoch', () => {
    it('same if 00', () => {
        const day = new Date('2020-1-1');
        const epoch = strTimePlusDayAsEpoch(day, '00:00:00');
        expect(1577829600).to.equal(epoch);
    });

    it('string is 24hr', () => {
        const day = new Date('2020-1-1');
        const epoch = strTimePlusDayAsEpoch(day, '15:10:00');
        expect(1577851815).to.equal(epoch);
    });

    it('max is 23', () => {
        const day = new Date('2020-1-1');
        const epoch = strTimePlusDayAsEpoch(day, '23:59:59');
        expect(1577866283).to.equal(epoch);
    });
});
