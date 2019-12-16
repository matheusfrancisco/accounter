import { ParamsDictionary } from "express-serve-static-core";

interface HolderService {
    createHolder: (name: string, taxpayerRegistry: string) => Promise<void>;
}

class ServiceError extends Error {};

const buildErrorMessage = (message: string) => ({ error: message });
const reply404 = (res: any, message: string) =>  res.status(400).json(buildErrorMessage(message));

const buildHolderController = (holderService: HolderService) => ({
    postHolder: async (req: any, res: any) => {
        if (!req.body.name || !req.body.taxpayerRegistry) {
            reply404(res, 'Parameters missing');
            return;
        }
        try {
            await holderService.createHolder(req.body.name, req.body.taxpayerRegistry);            
            res.status(201).end();
        } catch (error) {
            if (error.constructor.name === 'ServiceError') {
                reply404(res, error.message);
            } else {
                throw error;
            }
        }
    },
});

export { buildHolderController, ServiceError };