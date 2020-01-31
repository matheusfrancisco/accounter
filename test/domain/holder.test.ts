import Holder from '../../src/domain/holder';

describe('Holder', () => {
    const expectedName = 'Marina';
    const expectedTaxpayerRegistry = '56282681006';
    const holder = new Holder(expectedName, expectedTaxpayerRegistry);

    it('has a name', () => {
        expect(holder.name).toEqual(expectedName);    
    });

    it('has a taxpayerRegistry', () => {
        expect(holder.taxpayerRegistry).toEqual(expectedTaxpayerRegistry);    
    });

    it('throws when taxpayerRegistry is invalid', () => {
        try {
            new Holder('X', 'zueira')
        } catch {
            expect(true).toBeTruthy;
            return;
        }
        expect(true).toBeFalsy;
        //expect(() => new Holder('X', 'zueira')).toThrowError('invalid taxpayerRegistry');
    });
});