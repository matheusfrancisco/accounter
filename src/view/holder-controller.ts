interface HolderService {
    createHolder: (name: string, taxpayerRegister: string) => void;
}

const buildHolderController = (holderService: HolderService) => ({
    postHolder: (req: any, res: any) => {
        holderService.createHolder(req.body.name, req.body.taxpayerRegister);
        console.log(res)
        res.status(201).end();
    },
});

export { buildHolderController };