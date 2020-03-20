import {MemoryHolderRepository} from './infrastructure/memory-holder-repository';
import HolderService from './application/holder-service';
import {CountryFactory} from './domain/country';
import {buildHolderController} from './view/holder-controller';

export class FintopFactory {
  public static build() {
    const holderRepository = new MemoryHolderRepository();
    const countryFactory = new CountryFactory();
    const holderService = new HolderService(holderRepository, countryFactory);
    const holderController = buildHolderController(holderService);
    return {holderController, holderService};
  }
}
