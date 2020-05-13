import Holder from '../holder/holder';
import Account from './account';
import TaxpayerRegistry from '../holder/taxpayer-registry';
import { countries } from '../holder/country';

describe('Account', () => {
  describe('constructor', () => {
    it('require a holder to be provided', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Lucas', taxpayerRegistry);
      const account = new Account(holder);

      expect(account.holders).toEqual([holder]);
    });
  });

  describe('addHolder', () => {
    it('Adds a new account holder', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const lucas = new Holder('Lucas', taxpayerRegistry);
      const matheus = new Holder('Matheus', taxpayerRegistry);
      const account = new Account(lucas);

      account.addHolder(matheus);
      expect(account.holders).toEqual([lucas, matheus]);
    });
  });
});
