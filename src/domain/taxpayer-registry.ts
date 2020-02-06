export type CountryCode = 'US' | 'BR';

export default class TaxpayerRegistry {
    constructor(readonly value: string, readonly countryCode: CountryCode) {
        this.validateTaxpayerRegistry(value, countryCode);
    }
    validateTaxpayerRegistry(taxpayerRegistry: string, countryCode: CountryCode) {
        function cpf(cpf: any) {
            cpf = cpf.replace(/\D/g, '');
            if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf))
                return false;
            var result = true;
            [9, 10].forEach(function (j) {
                var soma = 0, r;
                cpf.split(/(?=)/).splice(0, j).forEach(function (e: any, i: any) {
                    soma += parseInt(e) * ((j + 2) - (i + 1));
                });
                r = soma % 11;
                r = (r < 2) ? 0 : 11 - r;
                if (r != cpf.substring(j, j + 1))
                    result = false;
            });
            return result;
        }

        function validateSSN (elementValue: string){
            var  ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
            return ssnPattern.test(elementValue);
        }
        if(countryCode === 'BR') {
            if (!cpf(taxpayerRegistry))
               throw new Error('invalid taxpayerRegistry');
        } else {
            if (!validateSSN(taxpayerRegistry))
               throw new Error('invalid taxpayerRegistry');
        }
    }
}
