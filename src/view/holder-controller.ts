import { ParamsDictionary } from "express-serve-static-core";
import HolderService from "../application/holder-service";

class ServiceError extends Error {};

const buildErrorMessage = (message: string) => ({ error: message });
const reply400 = (res: any, message: string) =>  res.status(400).json(buildErrorMessage(message));

const buildHolderController = (holderService: HolderService) => ({
    post: async (req: any, res: any) => {
        if (!req.body.name || !req.body.taxpayerRegistry) {
            reply400(res, 'Parameters missing');
            return;
        }
        try {
            await holderService.createHolder(req.body.name, req.body.taxpayerRegistry, req.body.countryCode);            
            res.status(201).end();
        } catch (error) {
            if (error.constructor.name === 'ServiceError') {
                reply400(res, error.message);
            } else {
                throw error;
            }
        }
    },
});

export { buildHolderController, ServiceError };