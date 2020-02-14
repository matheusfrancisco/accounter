import sinon from 'sinon';
import HolderService from '../../src/application/holder-service';
import Holder from "../../src/domain/holder";
import { countries, CountryFactory } from '../../src/domain/country';

describe("HolderService", () => {
    it("should save Holder with HolderRespository", () => {
        const save = sinon.spy();
        const buildCountry = sinon.fake.returns(countries.US);
        const countryFactory = { buildCountry };
        const holderService = new HolderService({ save }, countryFactory);
        holderService.createHolder('Matheus', '222-22-2222', 'US');
        expect(buildCountry.called).toBeTruthy();
        expect(save.called).toBeTruthy();
        expect(save.args[0][0] instanceof Holder).toBeTruthy();
        expect(save.args[0][0].taxpayerRegistry.country.countryCode).toEqual('US');
   });

   it('should throw when countryCode is unknown', async () => {
        const save = sinon.spy();
        const buildCountry = sinon.fake.returns(undefined);
        const countryFactory = { buildCountry };
        const holderService = new HolderService({ save }, countryFactory);
        expect(() => holderService.createHolder('Matheus', '222-22-2222', 'FR')).toThrowError();
   })

});