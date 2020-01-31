import Holder from "../domain/holder";

export interface HolderRepository {
    save: (holder: Holder) => Promise<void>;
};

export default class HolderService {

    constructor(private holderRepository: HolderRepository) { }

    async createHolder(name: string, taxpayerRegistry: string) {
        this.holderRepository.save(new Holder(name, taxpayerRegistry));
    }
}

