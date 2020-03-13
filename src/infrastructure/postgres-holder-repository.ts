import { HolderRepository } from "src/domain/holder-repository";
import Holder from "src/domain/holder";

export class PostgresHolderRepository implements HolderRepository{
    public save(holder: Holder): Promise<void>  {
        return Promise.resolve();
    };  
};