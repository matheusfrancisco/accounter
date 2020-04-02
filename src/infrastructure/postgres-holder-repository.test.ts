import { HolderRepository } from '../../src/domain/holder-repository';
import Holder from '../../src/domain/holder';
import TaxpayerRegistry from '../../src/domain/taxpayer-registry';
import { countries } from '../../src/domain/country';
import { getRepository, createConnection } from 'typeorm';
import { HolderEntity } from '../../src/infrastructure/entity/holder-entity';
import { PostgresHolderRepository } from '../../src/infrastructure/postgres-holder-repository';

describe('Holder Repository', () => {
  let repository;
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
