import { expect } from 'chai';
import { relativeBarrier } from '../_utils';

describe('relativeBarrier', () => {
    it('when a contract has entry spot, return the barrier offset from it', () => {
        const contract = {
            barrier: 5,
            entry_spot: 10,
        };
        const barrier = relativeBarrier(contract);
        expect(barrier).to.equal(15);
    });

    it('when no entry spot, barrier is an offset of the last tick', () => {
        const contract = {
            barrier: 5,
        };
        const barrier = relativeBarrier(contract, { quote: 20 });
        expect(barrier).to.equal(25);
    });
});
