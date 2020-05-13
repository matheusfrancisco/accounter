import Holder from '../holder/holder';

export default class Account {
  readonly holders: Holder[] = [];

  constructor(readonly holder: Holder) {
    this.holders.push(holder);
  }

  addHolder(holder: Holder) {
    this.holders.push(holder);
  }

  // TODO: Alterar construtor para receber os holders
  // TODO: Remover addHolder
}
