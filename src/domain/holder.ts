import { TaxpayerRegistry } from "./taxpayer-registry";

export default class Holder {
    constructor(readonly name: string, readonly taxpayerRegistry: TaxpayerRegistry) {}
};