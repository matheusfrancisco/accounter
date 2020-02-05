import Holder from '../../src/domain/holder';
import TaxpayerRegistry from '../../src/domain/taxpayer-registry';

describe('Holder', () => {
    const expectedName = 'Marina';
    const expectedTaxpayerRegistry = new TaxpayerRegistry('56282681006');
    const holder = new Holder(expectedName, expectedTaxpayerRegistry);

    it('has a name', () => {
        expect(holder.name).toEqual(expectedName);    
    });

    it('has a taxpayerRegistry', () => {
        expect(holder.taxpayerRegistry).toEqual(expectedTaxpayerRegistry);    
    });
});