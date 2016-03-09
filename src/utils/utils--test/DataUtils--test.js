import { expect } from 'chai';
import { areTicksEqual } from '../DataUtils';

describe('areTicksEqual', () => {
    it('two empty tick lists are equal', () => {
        const ticks1 = [];
        const ticks2 = [];
        const result = areTicksEqual(ticks1, ticks2);
        expect(result).to.equal(true);
    });

    it('tick lists with different legths are never equal', () => {
        const ticks1 = [];
        const ticks2 = [1];
        const result = areTicksEqual(ticks1, ticks2);
        expect(result).to.equal(false);
    });

    it('ticks lists with same epoch as last item always equal', () => {
        const ticks1 = [{ epoch: 1, quote: 123 }];
        const ticks2 = [{ epoch: 1, quote: 456 }];
        const result = areTicksEqual(ticks1, ticks2);
        expect(result).to.equal(true);
    });
});
