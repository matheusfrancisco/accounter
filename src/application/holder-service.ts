import Holder from '../domain/holder';
import TaxpayerRegistry from '../domain/taxpayer-registry';
import { HolderRepository } from '../domain/holder-repository';
import { CountryCode, CountryFactory } from '../domain/country';

export default class HolderService {
  constructor(private holderRepository: HolderRepository, private countryFactory: CountryFactory) {}

  async createHolder(name: string, taxpayerRegistry: string, countryCode: string) {
    const country = this.countryFactory.buildCountry(countryCode as CountryCode);
    this.holderRepository.save(new Holder(name, new TaxpayerRegistry(taxpayerRegistry, country)));
  }
}
