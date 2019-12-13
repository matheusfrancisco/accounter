import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const expect = chai.expect;
import { buildHolderController } from '../../src/view/holder-controller';

describe('HolderController', () => {
    let createHolder: sinon.SinonSpy;
    let holderServiceMock: { createHolder: sinon.SinonSpy };
    let holderController: any;
    let failingHolderController: any;
    let end: any;
    let endMock: any;
    let status: any;
    let resMock: any;
    
    const holderName = 'Matheus';
    const holderTaxpayerRegistry = '30330322210';
    const req = {body: {name: holderName , taxpayerRegistry: holderTaxpayerRegistry}};
    const reqWithoutName = {body: { taxpayerRegistry: holderTaxpayerRegistry}};
    const reqWithoutTaxpayerRegistry = {body: { name: holderName }};
    
    //TODO 
    // Todos os postHolder com await antes.
    // O createHolder vai ter que retornar uma Promise<sinon> (sinon spy promise)
    beforeEach(() => {
        createHolder = sinon.spy();
        holderServiceMock = { createHolder };
        holderController = buildHolderController(holderServiceMock);
        failingHolderController = buildHolderController({ createHolder: () => { throw new Error(); }});
        end = sinon.spy();
        endMock = { end };
        status = sinon.spy(() => endMock);
        resMock = { status };
    });
    
    it('Should receive name and taxpayeresgiter and delegate to application layer', () => {
        holderController.postHolder(req, resMock);
        expect(createHolder).to.have.been.calledWith(holderName, holderTaxpayerRegistry);
    });

    it('Should return status code 201', () => {
        holderController.postHolder(req, resMock);
        expect(status).to.have.been.calledWith(201);
        expect(end).to.have.been.called;
    }); 

    it('Should return status code 400 if name is not present', () => {
        holderController.postHolder(reqWithoutName, resMock);
        expect(status).to.have.been.calledWith(400);
        expect(end).to.have.been.called;
    });

    it('Should return status code 400 if taxpayerregistry is not present', () => {
        holderController.postHolder(reqWithoutTaxpayerRegistry, resMock);
        expect(status).to.have.been.calledWith(400);
        expect(end).to.have.been.called;
    });

    it('Should return status code 400 if error thrown', () => {
        failingHolderController.postHolder(req, resMock);
        expect(status).to.have.been.calledWith(400);
        expect(end).to.have.been.called;
    });
})