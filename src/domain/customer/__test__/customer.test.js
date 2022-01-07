const { expect } = require('@jest/globals');
const  Customer = require('../customer');

describe('Define a customer for getters test cases', () => {

    var customer = Object.create(Customer).init('Leopoldo', '1991/02/15', 22738795, 'Y');

    test('Check customer properties', () => {
        expect(customer).toHaveProperty('name', 'birthDate', 'dniNumber', 'dniLetter');
        expect(Object.keys(customer)).toHaveLength(4);
        expect(Object.keys(customer).length).not.toBeGreaterThan(4);
        expect(Object.keys(customer)).not.toBeNull();
    });

    test('Check customer getters methods', () => {
        expect(customer.getName()).toEqual(expect.stringMatching('Leopoldo'));
        expect(customer.getBirthDate()).toBe('1991/02/15');
        expect(customer.getDniNumber()).toEqual(22738795);
        expect(customer.getDniLetter()).toEqual(expect.stringMatching('Y'));
        expect(customer.getDniNumber()).not.toEqual(0);
        expect(customer.getDniLetter()).not.toBeUndefined();
    });

    test('Check customer is an adult, over 18 years old', () => {
        var child = Object.create(Customer).init('Sheldon', '2008/06/09', 12345678, 'T');
        var twentyOneYears = Object.create(Customer).init('I\'m 21 years old', '2001/01/07', 12345678, 'T');
        var twentyYears = Object.create(Customer).init('I\'m 20 years old', '2002/01/07', 12345678, 'T');
        expect(customer.checkIsAdult()).toBeTruthy();
        expect(twentyOneYears.checkIsAdult()).toBeTruthy();
        expect(child.checkIsAdult()).toBeFalsy();
        expect(twentyYears.checkIsAdult()).toBeFalsy();
    })

    test('Check the dni letter is correct for the dni number specified', () => {
        var dniValid =  Object.create(Customer).init('Bowie', '1947/01/08', '04649048', 'N');
        var dniNotValidLetters = Object.create(Customer).init('Bowie', '1947/01/08', '30147966', 'I');
        var dniNotValidWrongNumber = Object.create(Customer).init('Bowie', '1947/01/08', 90707250, 'J');
        var dniNotValidCharacters = Object.create(Customer).init('Bowie', '1947/01/08', 'ADBGETDR', 'T');
        expect(customer.checkValidDni()).toBeTruthy();
        expect(dniValid.checkValidDni()).toBeTruthy();
        expect(dniNotValidLetters.checkValidDni()).toBeFalsy();
        expect(dniNotValidWrongNumber.checkValidDni()).toBeFalsy();
        expect(dniNotValidCharacters.checkValidDni()).toBeFalsy();
    });
});