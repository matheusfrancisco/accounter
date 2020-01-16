export interface HolderRepository {
    save: () => Promise<void>;
};

export default class HolderService {

    constructor(private holderRepository: HolderRepository) { }

    async createHolder(name: string, taxpayerRegistry: string) {
        this.holderRepository.save();
    }
}

