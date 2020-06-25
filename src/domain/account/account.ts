import Holder from '../holder/holder';
import { ServiceError } from '../../service-error';
import Transaction from './transaction';

const MAX_HOLDER_COUNT = 5;

export const errorMessages = {
  zeroHolders: 'An account must have at least one Holder',
  maxHoldersExceeded: `Account must have no more than ${MAX_HOLDER_COUNT} holders`,
};

export default class Account {
  readonly holders: Holder[];
  public transactions: Transaction[] = [];

  constructor(holders: Holder[]) {
    if (!holders.length) throw new ServiceError(errorMessages.zeroHolders);
    if (holders.length > MAX_HOLDER_COUNT) throw new ServiceError(errorMessages.maxHoldersExceeded);

    this.holders = holders;
  }

  public transfer(account: Account, amount: number) {
    const transaction = new Transaction(this, account, amount);
    this.transactions.push(transaction);
    account.transactions.push(transaction);
  }

  public get balance(): number {
    return 0;
  }
}
