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
        const contract = { contract_type: 'CALL' };
        const plotBands = plotBandsForContractAndTrade(contract);
        expect(plotBands).to.not.be.empty;
    });

    it('when no barrier provided, barrier should equal last tick', () => {
        const contract = { contract_type: 'CALL' };
        const lastTick = 123;
        const plotBands = plotBandsForContractAndTrade(contract, lastTick);
        expect(plotBands[0].to).to.equal(123);
    });
});
