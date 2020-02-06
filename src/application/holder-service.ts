import Holder from "../domain/holder";
import TaxpayerRegistry from "../domain/taxpayer-registry";
import { CountryCode } from "../domain/taxpayer-registry";

export interface HolderRepository {
    save: (holder: Holder) => Promise<void>;
};

export default class HolderService {

    constructor(private holderRepository: HolderRepository) { }

    async createHolder(name: string, taxpayerRegistry: string, countryCode: string) {
        this.holderRepository.save(new Holder(name, new TaxpayerRegistry(taxpayerRegistry, countryCode as CountryCode)));
    }
}

