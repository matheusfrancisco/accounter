import { HolderRepository } from '../domain/holder/holder-repository';
import Holder from '../domain/holder/holder';
import TaxpayerRegistry from '../domain/holder/taxpayer-registry';
import { countries } from '../domain/holder/country';
import { getRepository, createConnection, Repository } from 'typeorm';
import { HolderEntity } from '../../src/infrastructure/entity/holder-entity';
import { PostgresHolderRepository } from '../../src/infrastructure/postgres-holder-repository';

describe('Holder Repository', () => {
  let repository: Repository<HolderEntity>;
  let connection;
  let holderRepository: HolderRepository;

  beforeEach(async () => {
    connection = await createConnection();
    repository = getRepository(HolderEntity);
    await repository.clear();
    holderRepository = new PostgresHolderRepository(connection);
  });

  it('Should save a holder', async () => {
    const holder = new Holder('Matheus', new TaxpayerRegistry('56282681006', countries.BR));
    await holderRepository.save(holder);
    const foundHolder = await repository.findOne({ taxpayerRegistry: '56282681006' });
    expect(foundHolder).toMatchObject({
      name: 'Matheus',
      taxpayerRegistry: '56282681006',
      country: 'BR',
    });
  });
});
