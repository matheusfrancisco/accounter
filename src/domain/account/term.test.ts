import Transaction from './transaction';
import Holder from '../holder/holder';
import Account from './account';
import TaxpayerRegistry from '../holder/taxpayer-registry';
import Term from './term';
import { countries } from '../holder/country';

describe('Term', () => {
  describe('constructor', () => {
    it('should have a list of transactions', () => {
      const previousTermBalance = 0;
      const transactions: Transaction[] = [];
      const startDate = new Date();
      const accountId = 'uuid';
      const term = new Term(accountId, previousTermBalance, transactions, startDate);
      expect(term.transactions).toEqual(transactions);
    });

    it('should have start date', () => {
      const previousTermBalance = 0;
      const transactions: Transaction[] = [];
      const startDate = new Date();
      const accountId = 'uuid';
      const term = new Term(accountId, previousTermBalance, transactions, startDate);
      expect(term.startDate).toEqual(startDate);
    });

    it('should have optional endDate', () => {
      const previousTermBalance = 0;
      const transactions: Transaction[] = [];
      const startDate = new Date();
      const endDate = new Date();
      const accountId = 'uuid';
      const term = new Term(accountId, previousTermBalance, transactions, startDate, endDate);
      expect(term.endDate).toEqual(endDate);
    });

    it('should have previousTermBalance', () => {
      const previousTermBalance = 0;
      const transactions: Transaction[] = [];
      const startDate = new Date();
      const accountId = 'uuid';
      const term = new Term(accountId, previousTermBalance, transactions, startDate);
      expect(term.previousTermBalance).toEqual(previousTermBalance);
    });

    it('should have accountId', () => {
      const previousTermBalance = 0;
      const transactions: Transaction[] = [];
      const startDate = new Date();
      const accountId = 'uuid';
      const term = new Term(accountId, previousTermBalance, transactions, startDate);
      expect(term.previousTermBalance).toEqual(previousTermBalance);
    });
  });

  describe('balance', () => {
    xit('it should be 0 if there are no transactions', () => {
      const previousTermBalance = 0;
      const transactions: Transaction[] = [];
      const startDate = new Date();
      const accountId = 'uuid';
      const term = new Term(accountId, previousTermBalance, transactions, startDate);

      expect(term.balance).toBe(0);
    });

    xit('should be 10 when occurs a transfer', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);
      const account = new Account([holder]);

      const taxpayerRegistry2 = new TaxpayerRegistry('13464210642', countries.BR);
      const holder2 = new Holder('Rebeca', taxpayerRegistry);
      const account2 = new Account([holder]);

      const previousTermBalance = 0;
      const transactions: Transaction[] = [new Transaction(account, account2, 10)];
      const startDate = new Date();
      const accountId = 'uuid';
      const term = new Term(accountId, previousTermBalance, transactions, startDate);

      expect(term.balance).toEqual(10);
    });
  });
});
