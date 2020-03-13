import { HolderRepository } from "../../src/domain/holder-repository";
import Holder from "../../src/domain/holder";
import TaxpayerRegistry from "../../src/domain/taxpayer-registry";
import { countries } from "../../src/domain/country";
import { getRepository } from "typeorm";
import { HolderEntity } from "../../src/infrastructure/entity/holder-entity";
import { PostgresHolderRepository } from '../../src/infrastructure/postgres-holder-repository';

describe('Holder Repository', () => {
    it('Should save a holder',  async () => {
        const holder = new Holder('Matheus', new TaxpayerRegistry('56282681006', countries.BR));
        const holderRespository: HolderRepository = new PostgresHolderRepository();
        holderRespository.save(holder);
        const repository = getRepository(HolderEntity);
        const bla = await repository.findOne({ taxpayerRegistry: '56282681006' });
        expect(bla).toEqual({ name: 'Matheus', taxpayerRegistry: '56282681006', country: 'BR' });
    });
});