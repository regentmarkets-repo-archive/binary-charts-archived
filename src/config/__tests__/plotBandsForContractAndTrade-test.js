import { expect } from 'chai';
import plotBandsForContractAndTrade from '../plotBandsForContractAndTrade';

describe('plotBandsForContractAndTrade', () => {
    it('should return empty list when no contract is provided', () => {
        const bands = plotBandsForContractAndTrade();
        expect(bands).to.deep.equal([]);
    });

    it('should throw an exception for non existing contract types', () => {
        expect(() => plotBandsForContractAndTrade({
            contract_type: 'NONEXISTING',
        })).to.throw();
    });

    it('should return a list of plot bands for existing contract type', () => {
        const plotBands = plotBandsForContractAndTrade({
            contract_type: 'CALL',
        });
        expect(plotBands.length > 0).to.be.true;
    });
});
