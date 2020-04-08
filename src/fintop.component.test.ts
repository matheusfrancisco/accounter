import { FintopFactory } from './fintop-factory';
import { MemoryHolderRepository } from './infrastructure/memory-holder-repository';

describe('fintop', () => {
  it('should register a holder', async () => {
    const { holderController, holderRepository } = await FintopFactory.build('test');
    const res = {
      status: () => ({ end: () => {} }),
    };

    const req = {
      body: {
        name: 'Félix',
        taxpayerRegistry: '96001348200',
        countryCode: 'BR',
      },
    };

    await holderController.post(req, res);

    expect((holderRepository as MemoryHolderRepository).holders).toHaveLength(1);
  });
});
