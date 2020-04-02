import Holder from 'src/domain/holder';
import { HolderRepository } from 'src/domain/holder-repository';

export class MemoryHolderRepository implements HolderRepository {
  public readonly holders: Holder[] = [];

  public async save(holder: Holder) {
    this.holders.push(holder);
  }
}
