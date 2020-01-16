import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import HolderService from '../../src/application/holder-service';
 
chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;

describe("HolderService", () => {
    it("should save Holder with HolderRespository", () => {
        const save = sinon.spy();
        const holderService = new HolderService({ save });
        holderService.createHolder('Matheus', '123123123');
        expect(save).to.have.been.called;
    });
});