import { expect } from 'chai';
import { areTickArraysEqual } from '../_utils';

describe('areTickArraysEqual', () => {
    it('two empty tick lists are equal', () => {
        const ticks1 = [];
        const ticks2 = [];
        const result = areTickArraysEqual(ticks1, ticks2);
        expect(result).to.equal(true);
    });

    it('tick lists with different legths are never equal', () => {
        const ticks1 = [];
        const ticks2 = [1];
        const result = areTickArraysEqual(ticks1, ticks2);
        expect(result).to.equal(false);
    });

    it('ticks lists with same epoch as last item always equal', () => {
        const ticks1 = [{ epoch: 1, quote: 123 }];
        const ticks2 = [{ epoch: 1, quote: 456 }];
        const result = areTickArraysEqual(ticks1, ticks2);
        expect(result).to.equal(true);
    });
});
