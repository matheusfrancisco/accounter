import {countries, CountryFactory, CountryCode} from '../../src/domain/country';

describe('Country', () => {
  describe('Brazil', () => {
    it('should validate Taxpayer Registry value', () => {
      expect(countries.BR.validateTaxpayerRegistry('56282681006')).toBeTruthy();
    });

    it('should throw for invalid CPF', () => {
      expect(() => countries.BR.validateTaxpayerRegistry('zueira')).toThrow();
    });
  });

  describe('United States', () => {
    it('should validate Taxpayer Registry value', () => {
      expect(countries.US.validateTaxpayerRegistry('427665509')).toBeTruthy();
    });

    it('should throw for invalid CPF', () => {
      expect(() => countries.US.validateTaxpayerRegistry('zueira')).toThrow();
    });
  });
});

describe('County Factory', () => {
  it('should throw for unknown country', () => {
    expect(() =>
      new CountryFactory().buildCountry('UNKNOWN_COUNTRY' as CountryCode),
    ).toThrowError();
  });
});
