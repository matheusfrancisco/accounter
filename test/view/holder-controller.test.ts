import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const expect = chai.expect;
import { buildHolderController } from '../../src/view/holder-controller';

describe('HolderController', () => {
    it('Should receive name and taxpayeresgiter and delegate to application layer', () => {
        const createHolder = sinon.spy();
        const holderServiceMock = { createHolder };
        const holderName = 'Matheus';
        const holderTaxpayerResgiter = '30330322210';
        const req = {body: {name: holderName , taxpayerRegister: holderTaxpayerResgiter}}
        const holderController = buildHolderController(holderServiceMock);
        holderController.postHolder(req, {});
        expect(createHolder).to.have.been
            .calledWith(holderName, holderTaxpayerResgiter);
    });
    it('Should return status code 201', () => {
        const createHolder = sinon.spy();
        const holderServiceMock = { createHolder };
        const end = sinon.spy();
        const endMock = { end };
        const status = sinon.spy(() => endMock);
        const resMock = { status };
        const holderName = 'Matheus';
        const holderTaxpayerResgiter = '30330322210';
        const req = {body: {name: holderName , taxpayerRegister: holderTaxpayerResgiter}}
        const holderController = buildHolderController(holderServiceMock);
        holderController.postHolder(req, resMock);
        expect(status).to.have.been
            .calledWith(201);
        expect(end).to.have.been.called;
    }); 
})