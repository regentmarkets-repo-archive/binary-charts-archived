import { expect } from 'chai';
import { areArraysEqual } from '../_utils';

describe('arrayEqual', () => {
    it('empty arrays are equal', () => {
        const ticks1 = [];
        const ticks2 = [];
        const result = areArraysEqual(ticks1, ticks2);
        expect(result).to.equal(true);
    });

    it('different arrays are not equal', () => {
        const ticks1 = [];
        const ticks2 = [1, 2, 3];
        const result = areArraysEqual(ticks1, ticks2);
        expect(result).to.equal(false);
    });

    it('arrays that are the same are equal', () => {
        const ticks1 = [1, 2, 3];
        const ticks2 = ticks1;
        const result = areArraysEqual(ticks1, ticks2);
        expect(result).to.equal(true);
    });

    it('arrays that have the same values are equal', () => {
        const ticks1 = [1, 2, 3];
        const ticks2 = [1, 2, 3];
        const result = areArraysEqual(ticks1, ticks2);
        expect(result).to.equal(true);
    });
});
