import TaxpayerRegistry from '../../src/domain/taxpayer-registry';
import {countries} from '../../src/domain/country';

describe('TaxpayerRegistry', () => {
  it('should hold Taxpayer Registry value', () => {
    const taxpayerRegistry = new TaxpayerRegistry('56282681006', countries.BR);
    expect(taxpayerRegistry.value).toEqual('56282681006');
  });
  it('should throw for invalid CPF', () => {
    expect(() => new TaxpayerRegistry('zueira', countries.BR)).toThrow();
  });
});
