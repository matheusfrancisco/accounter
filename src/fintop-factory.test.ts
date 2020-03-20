import {HolderRepository} from './domain/holder-repository';
import {FintopFactory} from './fintop-factory';
import {MemoryHolderRepository} from './infrastructure/memory-holder-repository';

describe('Fintop Factory', () => {
  it('Should build application in test mode', () => {
    const container = FintopFactory.build();
    const controller = container.holderController as any;
    const service = container.holderService as any;
    const repository = service.holderRepository as HolderRepository;

    expect(repository).toBeInstanceOf(MemoryHolderRepository);
  });
});
