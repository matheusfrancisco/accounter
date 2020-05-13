import { HolderRepository } from '../domain/holder/holder-repository';
import Holder from '../domain/holder/holder';
import TaxpayerRegistry from '../domain/holder/taxpayer-registry';
import { countries } from '../domain/holder/country';
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
