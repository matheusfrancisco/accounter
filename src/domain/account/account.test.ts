import Holder from '../holder/holder';
import TaxpayerRegistry from '../holder/taxpayer-registry';
import { countries } from '../holder/country';

describe('Account', () => {
  describe('constructor', () => {
    it('require a holder to be provided', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Lucas', taxpayerRegistry);
      const account = new Account(holder);

      expect(account.holder).toEqual(holder);
    });
  });
});
