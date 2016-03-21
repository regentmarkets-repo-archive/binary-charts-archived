import { expect } from 'chai';
import { callPutBarrier } from '../_utils';

describe('callPutBarrier', () => {
    it('call or put contract without a barrier is Rise/Fall type ', () => {
        const contract = {
            entry_spot: 10,
        };
        const barrier = callPutBarrier(contract);
        expect(barrier).to.equal(10);
    });

    it('call or put contract without a barrier is Rise/Fall type ', () => {
        const contract = {};
        const barrier = callPutBarrier(contract, { quote: 20 });
        expect(barrier).to.equal(20);
    });

    it('call or put contract with barrier is Higher/Lower type ', () => {
        const contract = {
            barrier: 5,
            entry_spot: 10,
        };
        const barrier = callPutBarrier(contract);
        expect(barrier).to.equal(15);
    });

    it('call or put contract with barrier is Higher/Lower type ', () => {
        const contract = {
            barrier: 5,
        };
        const barrier = callPutBarrier(contract, { quote: 20 });
        expect(barrier).to.equal(25);
    });
});
