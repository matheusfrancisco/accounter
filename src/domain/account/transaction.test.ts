describe('Transaction', () => {
  describe('constructor', () => {
    it('should build a transaction with credit and debit account and amount', () => {
      const firstAccount = null;
      const secondAccount = null;
      const amount = 100;
      const transaction = new Transaction(firstAccount, secondAccount, amount);

      expect(transaction.creditAccount).toEqual(firstAccount);
      expect(transaction.debitAccount).toEqual(secondAccount);
      expect(transaction.amount).toEqual(amount);
    });
  });
});
