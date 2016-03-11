import { expect } from 'chai';
import { areArraysEqual, areTickArraysEqual, doTicksDifferJustOneEntry } from '../DataUtils';

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

describe('doTicksDifferJustOneEntry', () => {
    it('two empty lists do differ one tick', () => {
        const ticks1 = [];
        const ticks2 = [];
        const result = doTicksDifferJustOneEntry(ticks1, ticks2);
        expect(result).to.equal(true);
    });

    it('one empty lists and a list of one item do differ one tick', () => {
        const ticks1 = [];
        const ticks2 = [{ epoch: 1 }];
        const result = doTicksDifferJustOneEntry(ticks1, ticks2);
        expect(result).to.equal(true);
    });

    it('a list that differs more than one item length do not differ one tick', () => {
        const ticks1 = [{ epoch: 1 }];
        const ticks2 = [{ epoch: 1 }, { epoch: 2 }, { epoch: 3 }];
        const result = doTicksDifferJustOneEntry(ticks1, ticks2);
        expect(result).to.equal(false);
    });

    it('lists that differ one item and content is offset by one, do differ one tick', () => {
        const ticks1 = [{ epoch: 1 }, { epoch: 2 }];
        const ticks2 = [{ epoch: 1 }, { epoch: 2 }, { epoch: 3 }];
        const result = doTicksDifferJustOneEntry(ticks1, ticks2);
        expect(result).to.equal(true);
    });

    it('lists that differ one item but content is not offset by one, do not differ one tick', () => {
        const ticks1 = [{ epoch: 2 }, { epoch: 1 }];
        const ticks2 = [{ epoch: 1 }, { epoch: 2 }, { epoch: 3 }];
        const result = doTicksDifferJustOneEntry(ticks1, ticks2);
        expect(result).to.equal(false);
    });

    it('lists that are the same length but have offseted values, do differ one tick', () => {
        const ticks1 = [{ epoch: 1 }, { epoch: 2 }, { epoch: 3 }];
        const ticks2 = [{ epoch: 2 }, { epoch: 3 }, { epoch: 4 }];
        const result = doTicksDifferJustOneEntry(ticks1, ticks2);
        expect(result).to.equal(true);
    });
});

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
