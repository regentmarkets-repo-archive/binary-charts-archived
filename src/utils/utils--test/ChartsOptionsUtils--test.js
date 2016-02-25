import { expect } from 'chai';
import { optionsCombiner } from '../ChartsOptionsUtils';

describe('optionsCombiner', () => {
    "use strict";
    it('should combine more than 2 options object', () => {
        const opt1 = { a: 'a', b: { c: 'c', d: [1, 2, 3]}};
        const opt2 = { e: 'a', f: 'f'};
        const opt3 = { b: { d: [4, 5, 6]}};

        const result = optionsCombiner([opt1, opt2, opt3]);

        expect(result).to.deep.equal({
            a: 'a',
            b: {
                c: 'c',
                d: [1, 2, 3, 4, 5, 6]
            },
            e: 'a',
            f: 'f'
        });
    });
});
