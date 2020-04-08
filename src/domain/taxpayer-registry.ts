import { Country } from './country';

export class ServiceError extends Error {}

export default class TaxpayerRegistry {
  constructor(readonly value: string, readonly country: Country) {
    country.validateTaxpayerRegistry(value);
  }
}
