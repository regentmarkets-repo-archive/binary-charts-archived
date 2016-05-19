import { expect } from 'chai';
import { plotBandForContract, plotBandForTrade } from '../plotBandsForContractAndTrade';

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

    describe('plotBandForTrade', () => {
        it('should return empty list when no contract is provided', () => {
            const bands = plotBandForTrade();
            expect(bands).to.deep.equal([]);
        });

        it('should throw an exception for non existing contract types', () => {
            expect(() => plotBandForTrade({
                contract_type: 'NONEXISTING',
            })).to.throw();
        });

        it('should return a list of plot bands for existing contract type', () => {
            const contract = { contract_type: 'CALL' };
            const plotBands = plotBandForTrade(contract);
            expect(plotBands).to.not.be.empty;
        });

        it('when no barrier provided, barrier should equal last tick', () => {
            const contract = { contract_type: 'CALL' };
            const lastTick = 123;
            const plotBands = plotBandForTrade(contract, lastTick);
            expect(plotBands[0].to).to.equal(123);
        });
    });
});
