import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;
import { ServiceError } from '../service-error';
import { buildHolderController } from './holder-controller';
import HolderService from '../application/holder-service';
import { CountryFactory } from '../domain/country';
import { HolderResource } from '../application/holder-service';

describe('HolderController', () => {
  let createHolder: sinon.SinonSpy;
  let createHolderMock: (name: string, taxpayerRegistry: string) => Promise<void>;
  let holderServiceMock: HolderService;
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
  const holderCountryCode = 'BR';
  const expectedHolders = [
    { id: 1, name: 'Xico', taxpayerRegistry: '56282681006', countryCode: 'BR' },
  ];
  const req = {
    body: {
      name: holderName,
      taxpayerRegistry: holderTaxpayerRegistry,
      countryCode: holderCountryCode,
    },
  };
  const reqWithoutName = { body: { taxpayerRegistry: holderTaxpayerRegistry } };
  const reqWithoutTaxpayerRegistry = { body: { name: holderName, countryCode: holderCountryCode } };
  const reqWithoutCountryCode = {
    body: { name: holderName, taxpayerRegistry: holderTaxpayerRegistry },
  };
  const holderRepository = { save: () => Promise.resolve() };
  const promiseThatThrows = () => {
    throw new Error('Unknown error');
  };

  class HolderServiceMock extends HolderService {
    constructor(
      holderRepository: HolderRepository,
      countryFactory: CountryFactory,
      createHolder: (name: string, taxpayerRegistry: string) => Promise<void>,
      findHolders: () => Promise<HolderResource[]>,
    ) {
      super(holderRepository, countryFactory);
      this.createHolder = createHolder;
      this.findHolders = findHolders;
    }
  }

  beforeEach(() => {
    createHolder = sinon.spy();
    createHolderMock = (name: string, taxpayerRegistry: string) => {
      return Promise.resolve(createHolder(name, taxpayerRegistry));
    };
    holderController = buildHolderController(
      new HolderServiceMock(holderRepository, new CountryFactory(), createHolder, () =>
        Promise.resolve(expectedHolders),
      ),
    );
    failingHolderController = buildHolderController(
      new HolderServiceMock(
        holderRepository,
        new CountryFactory(),
        () => {
          throw new ServiceError('Service error');
        },
        () => Promise.resolve([]),
      ),
    );
    failingForUnknownReasonsHolderController = buildHolderController(
      new HolderServiceMock(
        holderRepository,
        new CountryFactory(),
        promiseThatThrows,
        promiseThatThrows,
      ),
    );
    end = sinon.spy();
    json = sinon.spy();
    statusReturnMock = { end, json };
    status = sinon.spy(() => statusReturnMock);
    resMock = { status };
  });

  describe('GET', () => {
    it('Should return holder list', async () => {
      const holderList = await holderController.get();
      expect(expectedHolders).to.be.equal(holderList);
    });

    it('Should return 500 when promise eventually throws', () => {
      expect(failingForUnknownReasonsHolderController.get(req, resMock)).to.not.eventually.throw;
      expect(status).to.have.been.calledWith(500);
    });
  });
  describe('POST', () => {
    it('Should receive name and taxpayerRegistry and country code and delegate to application layer', async () => {
      await holderController.post(req, resMock);
      expect(createHolder).to.have.been.calledWith(
        holderName,
        holderTaxpayerRegistry,
        holderCountryCode,
      );
    });

    it('Should return status code 201', async () => {
      await holderController.post(req, resMock);
      expect(status).to.have.been.calledWith(201);
      expect(end).to.have.been.called;
    });

    it('Should return status code 400 if name is not present', async () => {
      await holderController.post(reqWithoutName, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if taxpayerregistry is not present', async () => {
      await holderController.post(reqWithoutTaxpayerRegistry, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if countryCode is not present', async () => {
      await holderController.post(reqWithoutCountryCode, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if error thrown', async () => {
      await failingHolderController.post(req, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Service error' });
    });

    it('Should return status code 400 if body is empty', async () => {
      await holderController.post({}, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Shoud return status 500 if exception is unknow', () => {
      expect(failingForUnknownReasonsHolderController.post(req, resMock)).to.not.eventually.throw;
      expect(status).to.have.been.calledWith(500);
    });
  });
});
