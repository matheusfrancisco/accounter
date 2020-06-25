import Account from './account';

export default class Transaction {
  constructor(
    readonly creditAccount?: Account,
    readonly debitAccount?: Account,
    readonly amount?: Number,
  ) {}
}
