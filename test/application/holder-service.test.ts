import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import HolderService from '../../src/application/holder-service';
import Holder from "../../src/domain/holder";

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

describe("HolderService", () => {
    it("should save Holder with HolderRespository", () => {
        const save = sinon.spy();
        const holderService = new HolderService({ save });
        holderService.createHolder('Matheus', '56282681006');
        expect(save).to.have.been.called;
        expect(save.args[0][0] instanceof Holder).to.be.true;
    });

});