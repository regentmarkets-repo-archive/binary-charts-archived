import { expect } from 'chai';
import { strTimePlusDayAsEpoch } from '../updateTradingTimes';

describe('strTimePlusDayAsEpoch', () => {
    it('same if 00', () => {
        const day = new Date(2020, 1, 1);
        const epoch = strTimePlusDayAsEpoch(day, '00:00:00');
        expect(1580508000).to.equal(epoch);
    });

    it('string is 24hr', () => {
        const day = new Date(2020, 1, 1);
        const epoch = strTimePlusDayAsEpoch(day, '15:10:00');
        expect(1580530215).to.equal(epoch);
    });

    it('max is 23', () => {
        const day = new Date(2020, 1, 1);
        const epoch = strTimePlusDayAsEpoch(day, '23:59:59');
        expect(1580544683).to.equal(epoch);
    });
});
