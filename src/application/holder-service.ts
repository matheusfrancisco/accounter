import Holder from '../domain/holder/holder';
import TaxpayerRegistry from '../domain/holder/taxpayer-registry';
import { HolderRepository } from '../domain/holder/holder-repository';
import { CountryCode, CountryFactory } from '../domain/holder/country';

export interface HolderResource {
  id: number;
  name: string;
  taxpayerRegistry: string;
  countryCode: string;
}
export default class HolderService {
  constructor(private holderRepository: HolderRepository, private countryFactory: CountryFactory) {}

  async createHolder(name: string, taxpayerRegistry: string, countryCode: string) {
    const country = this.countryFactory.buildCountry(countryCode as CountryCode);
    this.holderRepository.save(new Holder(name, new TaxpayerRegistry(taxpayerRegistry, country)));
  }

  async findHolders(): Promise<HolderResource[]> {
    throw Error('Not implemented');
  }
}
