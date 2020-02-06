import TaxpayerRegistry from "../../src/domain/taxpayer-registry";

describe('TaxpayerRegistry', () => {
    it('should hold Taxpayer Registry value', () => {
        const taxpayerRegistry = new TaxpayerRegistry('56282681006', 'BR');
        expect(taxpayerRegistry.value).toEqual('56282681006');
    });

    describe('when taxpayer registry is invalid', () => {
        it('should throw for invalid SSN', () => {
            expect(() => new TaxpayerRegistry('zueira', 'US')).toThrow();
        });
        it('should throw for invalid CPF', () => {
            expect(() => new TaxpayerRegistry('zueira')).toThrow();
        });
    });

    it('should accept social security number for usa citizens' , () => {
        const taxpayerRegistry = new TaxpayerRegistry('427665509', 'US');
        expect(taxpayerRegistry.value).toEqual('427665509');        
    });
});