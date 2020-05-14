import Holder from '../holder/holder';
import Account, { errorMessages } from './account';

import TaxpayerRegistry from '../holder/taxpayer-registry';
import { countries } from '../holder/country';

describe('Account', () => {
  describe('constructor', () => {
    it('require a holder to be provided', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Lucas', taxpayerRegistry);
      const account = new Account([holder]);

      expect(account.holders).toEqual([holder]);
    });

    it('can recieve more than one holder', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const lucas = new Holder('Lucas', taxpayerRegistry);
      const matheus = new Holder('Matheus', taxpayerRegistry);
      const account = new Account([lucas, matheus]);

      expect(account.holders).toEqual([lucas, matheus]);
    });

    it('should throw exception when holders is empty', () => {
      expect(() => new Account([])).toThrow(errorMessages.zeroHolders);
    });

    it('should throw exception when more than 5 holders are provided', () => {
      const taxpayerRegistry = new TaxpayerRegistry('13464210642', countries.BR);
      const holder = new Holder('Matheus', taxpayerRegistry);

      expect(() => new Account([holder, holder, holder, holder, holder, holder])).toThrow(
        errorMessages.maxHoldersExceeded,
      );
    });
  });
});
