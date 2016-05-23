import { expect } from 'chai';
import { plotBandForContract } from '../plotBandsForContract';

describe('plotBandsForContractAndTrade', () => {
    describe('plotBandForContract', () => {
        it('should return empty list when no contract is provided', () => {
            const bands = plotBandForContract();
            expect(bands).to.deep.equal([]);
        });

        it('should throw an exception for non existing contract types', () => {
            expect(() => plotBandForContract({
                contract_type: 'NONEXISTING',
            })).to.throw();
        });

        it('should return a list of plot bands for existing contract type', () => {
            const contract = { contract_type: 'CALL' };
            const plotBands = plotBandForContract(contract);
            expect(plotBands).to.not.be.empty;
        });
    });
});
