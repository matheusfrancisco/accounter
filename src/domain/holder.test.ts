import Holder from './holder';
import TaxpayerRegistry from './taxpayer-registry';

describe('Holder', () => {
  const expectedName = 'Marina';
  const expectedTaxpayerRegistry = new TaxpayerRegistry('56282681006', {
    countryCode: 'BR',
    validateTaxpayerRegistry: () => true,
  });
  const holder = new Holder(expectedName, expectedTaxpayerRegistry);

  it('has a name', () => {
    expect(holder.name).toEqual(expectedName);
  });

  it('has a taxpayerRegistry', () => {
    expect(holder.taxpayerRegistry).toEqual(expectedTaxpayerRegistry);
  });
});
