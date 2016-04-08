import { expect } from 'chai';
import { relativeBarrier, relativeBarrier2 } from '../_utils';

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

describe('relativeBarrier2', () => {
    it('calculates 2nd relative barrier', () => {
        const contract = {
            barrier: 5,
            barrier2: 20,
        };
        const barrier = relativeBarrier2(contract, { quote: 20 });
        expect(barrier).to.equal(40);
    });
});
