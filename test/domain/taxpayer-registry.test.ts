import TaxpayerRegistry from "../../src/domain/taxpayer-registry";

describe('TaxpayerRegistry', () => {
    it('should hold Taxpayer Registry value', () => {
        const taxpayerRegistry = new TaxpayerRegistry('56282681006');
        expect(taxpayerRegistry.value).toEqual('56282681006');
    });

    it('should throw when taxpayer registry is invalid', () => {
        expect(() => new TaxpayerRegistry('zueira')).toThrow();
    })
});