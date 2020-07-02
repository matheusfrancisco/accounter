import Transaction from './transaction';

class Term {
  constructor(
    readonly accountId: string,
    readonly previousTermBalance: number,
    readonly transactions: Transaction[],
    readonly startDate: Date,
    readonly endDate?: Date,
  ) {}

  public get balance(): number {
    return 0;
    // return this.transactions.reduce(
    //   (balance, transaction) =>
    //     transaction.creditAccount === this
    //       ? balance - transaction.amount
    //       : balance + transaction.amount,
    //   0,
    // );
  }
}

export default Term;
