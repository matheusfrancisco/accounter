import Holder from '../holder/holder';
import Account, { errorMessages } from './account';
import Transaction from './transaction';

import TaxpayerRegistry from '../holder/taxpayer-registry';
import { countries } from '../holder/country';

describe('Account', () => {
  describe('constructor', () => {
    it('require a holder to be provided', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Lucas', taxpayerRegistry);
      const account = new Account([holder]);

      expect(account.holders).toEqual([holder]);
    });

    it('can recieve more than one holder', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const lucas = new Holder('Lucas', taxpayerRegistry);
      const matheus = new Holder('Matheus', taxpayerRegistry);
      const account = new Account([lucas, matheus]);

      expect(account.holders).toEqual([lucas, matheus]);
    });

    it('should throw exception when holders is empty', () => {
      expect(() => new Account([])).toThrow(errorMessages.zeroHolders);
    });

    it('should throw exception when more than 5 holders are provided', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);

      expect(() => new Account([holder, holder, holder, holder, holder, holder])).toThrow(
        errorMessages.maxHoldersExceeded,
      );
    });
  });
  describe('transactions', () => {
    it('should return empty list when no transactions have been commited', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);
      const account = new Account([holder]);

      expect(account.transactions).toEqual([]);
    });
  });

  describe('transfer', () => {
    it('should create a transaction for both accounts', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);
      const firstAccount = new Account([holder]);
      const secondAccount = new Account([holder]);
      const amount = 1200.0;

      firstAccount.transfer(secondAccount, amount);

      expect(firstAccount.transactions.length).toBeGreaterThan(0);
      expect(firstAccount.transactions).toEqual(secondAccount.transactions);
      expect((firstAccount.transactions[0] as any) instanceof Transaction).toBeTruthy();
      expect(firstAccount.transactions[0].amount).toEqual(amount);
      expect(firstAccount.transactions[0].creditAccount).toEqual(firstAccount);
      expect(firstAccount.transactions[0].debitAccount).toEqual(secondAccount);
    });
  });

  describe('balance', () => {
    it('it should be 0 if there are no transactions', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);
      const account = new Account([holder]);

      expect(account.balance).toBe(0);
    });

    it('should be 10 when occurs a transfer', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);
      const account = new Account([holder]);

      const taxpayerRegistry2 = new TaxpayerRegistry('13464210642', countries.BR);
      const holder2 = new Holder('Rebeca', taxpayerRegistry);
      const account2 = new Account([holder]);

      account.transfer(account2, 10);

      expect(account2.balance).toEqual(10);
      expect(account.balance).toEqual(-10);
    });
  });
});
