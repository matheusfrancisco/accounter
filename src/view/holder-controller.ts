interface HolderService {
    createHolder: (name: string, taxpayerRegistry: string) => Promise<void>;
}

const buildHolderController = (holderService: HolderService) => ({
    postHolder: async (req: any, res: any) => {
        if (!req.body.name || !req.body.taxpayerRegistry) {
            res.status(400).end();
            return;
        }
        try {
            await holderService.createHolder(req.body.name, req.body.taxpayerRegistry);            
            res.status(201).end();
        } catch (error) {
            res.status(400).end();
        }
    },
});

export { buildHolderController };