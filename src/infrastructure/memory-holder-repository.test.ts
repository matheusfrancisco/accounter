import { HolderRepository } from '../../src/domain/holder-repository';
import Holder from '../../src/domain/holder';
import TaxpayerRegistry from '../../src/domain/taxpayer-registry';
import { countries } from '../../src/domain/country';
import { MemoryHolderRepository } from './memory-holder-repository';

describe('Memory Holder Repository', () => {
  let holderRepository: MemoryHolderRepository;

  beforeEach(async () => {
    holderRepository = new MemoryHolderRepository();
  });

  it('Should save a holder', async () => {
    const holder = new Holder('Matheus', new TaxpayerRegistry('56282681006', countries.BR));
    await holderRepository.save(holder);
    const foundHolder = holderRepository.holders[0];
    expect(foundHolder).toEqual(holder);
  });
});
