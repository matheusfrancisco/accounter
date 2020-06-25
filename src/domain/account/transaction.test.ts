import Transaction from './transaction';
import Holder from '../holder/holder';
import Account from './account';

import TaxpayerRegistry from '../holder/taxpayer-registry';
import { countries } from '../holder/country';
describe('Transaction', () => {
  describe('constructor', () => {
    it('should build a transaction with credit and debit account and amount', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);
      const firstAccount = new Account([holder]);
      const secondAccount = new Account([holder]);
      const amount = 100;
      const transaction = new Transaction(firstAccount, secondAccount, amount);

      expect(transaction.creditAccount).toEqual(firstAccount);
      expect(transaction.debitAccount).toEqual(secondAccount);
      expect(transaction.amount).toEqual(amount);
    });
  });
});
