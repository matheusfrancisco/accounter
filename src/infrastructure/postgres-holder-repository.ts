import {HolderRepository} from 'src/domain/holder-repository';
import {HolderEntity} from '../../src/infrastructure/entity/holder-entity';
import {Connection, getRepository} from 'typeorm';
import Holder from 'src/domain/holder';

export class PostgresHolderRepository implements HolderRepository {
  constructor(private connection: Connection) {}
  public async save({taxpayerRegistry, name}: Holder): Promise<void> {
    const entity = {
      name,
      country: taxpayerRegistry.country.countryCode,
      taxpayerRegistry: taxpayerRegistry.value,
    };
    await getRepository(HolderEntity).save(entity);
  }
}
