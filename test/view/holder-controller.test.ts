import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
 
chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;
import { buildHolderController, ServiceError } from '../../src/view/holder-controller';
import { promises } from 'fs';

describe('HolderController', () => {
    let createHolder: sinon.SinonSpy;
    let createHolderMock: (name: string, taxpayerRegistry: string) => Promise<void>;
    let holderServiceMock: { createHolder: (name: string, taxpayerRegistry: string) => Promise<void> };
    let holderController: any;
    let failingHolderController: any;
    let failingForUnknownReasonsHolderController: any;
    let end: any;
    let statusReturnMock: any;
    let status: any;
    let resMock: any;
    let json: any;
    
    const holderName = 'Matheus';
    const holderTaxpayerRegistry = '30330322210';
    const req = {body: {name: holderName , taxpayerRegistry: holderTaxpayerRegistry}};
    const reqWithoutName = {body: { taxpayerRegistry: holderTaxpayerRegistry}};
    const reqWithoutTaxpayerRegistry = {body: { name: holderName }};
    
    beforeEach(() => {
        createHolder = sinon.spy();
        createHolderMock = (name: string, taxpayerRegistry: string) => { 
            return Promise.resolve(createHolder(name, taxpayerRegistry)); 
        };
        holderServiceMock = { createHolder: createHolderMock };
        holderController = buildHolderController(holderServiceMock);
        failingHolderController = buildHolderController({ createHolder: () => { throw new ServiceError('Service error'); }});
        failingForUnknownReasonsHolderController = buildHolderController({ createHolder: () => { throw new Error('Unknown error'); }});
        end = sinon.spy();
        json = sinon.spy();
        statusReturnMock = { end, json };
        status = sinon.spy(() => statusReturnMock);
        resMock = { status };
    });
    
    it('Should receive name and taxpayeresgiter and delegate to application layer', async () => {
        await holderController.postHolder(req, resMock);
        expect(createHolder).to.have.been.calledWith(holderName, holderTaxpayerRegistry);
    });

    it('Should return status code 201', async () => {
        await holderController.postHolder(req, resMock);
        expect(status).to.have.been.calledWith(201);
        expect(end).to.have.been.called;
    }); 

    it('Should return status code 400 if name is not present', async () => {
        await holderController.postHolder(reqWithoutName, resMock);
        expect(status).to.have.been.calledWith(400);
        expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if taxpayerregistry is not present', async () => {
        await holderController.postHolder(reqWithoutTaxpayerRegistry, resMock);
        expect(status).to.have.been.calledWith(400);
        expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if error thrown', async () => {
        await failingHolderController.postHolder(req, resMock);
        expect(status).to.have.been.calledWith(400);
        expect(json).to.have.been.calledWith({ error: 'Service error' });
    });

    it('Should throw if error is unknown', () => {
        expect(failingForUnknownReasonsHolderController.postHolder(req, resMock))
            .to.eventually.throw;
        expect(status).to.not.have.been.called;
    });
})