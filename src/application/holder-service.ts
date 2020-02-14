import Holder from "../domain/holder";
import TaxpayerRegistry from "../domain/taxpayer-registry";
import { CountryCode, CountryFactory } from "../domain/country";

export interface HolderRepository {
    save: (holder: Holder) => Promise<void>;
};

export default class HolderService {

    constructor(
        private holderRepository: HolderRepository, 
        private countryFactory: CountryFactory,
        ) { }

    async createHolder(name: string, taxpayerRegistry: string, countryCode: string) {
        const country = this.countryFactory.buildCountry(countryCode as CountryCode);
        if(!country) throw new Error();
        this.holderRepository.save(new Holder(
            name, 
            new TaxpayerRegistry(
                taxpayerRegistry, 
                country,
            )
        ));
    }
}

