import { HolderRepository } from './domain/holder/holder-repository';
import { FintopFactory } from './fintop-factory';
import { MemoryHolderRepository } from './infrastructure/memory-holder-repository';
import { PostgresHolderRepository } from './infrastructure/postgres-holder-repository';

describe('Fintop Factory', () => {
  it('Should build application in test mode', async () => {
    const container = await FintopFactory.build('test');
    const controller = container.holderController as any;
    const service = container.holderService as any;
    const repository = service.holderRepository as HolderRepository;

    expect(repository).toBeInstanceOf(MemoryHolderRepository);
    expect(container.holderRepository).toBeInstanceOf(MemoryHolderRepository);
  });

  it('Should build application in production mode', async () => {
    const container = await FintopFactory.build();
    const controller = container.holderController as any;
    const service = container.holderService as any;
    const repository = service.holderRepository as HolderRepository;

    expect(repository).toBeInstanceOf(PostgresHolderRepository);
    expect(container.holderRepository).toBeInstanceOf(PostgresHolderRepository);
  });
});
