import Holder from '../holder/holder';
import { ServiceError } from '../../service-error';

const MAX_HOLDER_COUNT = 5;

export const errorMessages = {
  zeroHolders: 'An account must have at least one Holder',
  maxHoldersExceeded: `Account must have no more than ${MAX_HOLDER_COUNT} holders`,
};

export default class Account {
  readonly holders: Holder[];

  constructor(holders: Holder[]) {
    if (!holders.length) throw new ServiceError(errorMessages.zeroHolders);
    if (holders.length > MAX_HOLDER_COUNT) throw new ServiceError(errorMessages.maxHoldersExceeded);

    this.holders = holders;
  }

  // TODO: Alterar construtor para receber os holders
  // TODO: Remover addHolder
}
