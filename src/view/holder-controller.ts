import HolderService from '../application/holder-service';
import { ServiceError } from '../service-error';

const buildErrorMessage = (message: string) => ({ error: message });

const buildHolderController = (holderService: HolderService) => ({
  post: async (req: any, res: any) => {
    if (!req.body || !req.body.name || !req.body.taxpayerRegistry || !req.body.countryCode) {
      res.status(400).json(buildErrorMessage('Parameters missing'));
      return;
    }
    try {
      await holderService.createHolder(
        req.body.name,
        req.body.taxpayerRegistry,
        req.body.countryCode,
      );
      res.status(201).end();
    } catch (error) {
      const status = error.constructor.name === 'ServiceError' ? 400 : 500;
      res.status(status).json(buildErrorMessage(error.message));
    }
  },
  get: async (req: any, res: any) => {
    try {
      return holderService.findHolders();
    } catch (error) {
      res.status(500).json(buildErrorMessage(error.message));
    }
  },
});

export { buildHolderController, ServiceError };
