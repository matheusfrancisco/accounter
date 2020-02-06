import sinon from 'sinon';
import HolderService from '../../src/application/holder-service';
import Holder from "../../src/domain/holder";

describe("HolderService", () => {
    it("should save Holder with HolderRespository", () => {
        const save = sinon.spy();
        const holderService = new HolderService({ save });
        holderService.createHolder('Matheus', '222-22-2222', 'US');
        expect(save.called).toBeTruthy();
        expect(save.args[0][0] instanceof Holder).toBeTruthy();
        expect(save.args[0][0].taxpayerRegistry.countryCode).toEqual('US');
    });

});