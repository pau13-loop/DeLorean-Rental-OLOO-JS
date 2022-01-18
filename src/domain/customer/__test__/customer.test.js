const { expect } = require('@jest/globals');
const  Customer = require('../customer');

describe('Customer test cases', () => {

    var customer = Object.create(Customer)._init('Leopoldo', 'Alas', '1991/02/15', 22738795, 'Y');

    test('Check customer properties', () => {
        expect(customer).toHaveProperty('name', 'lastName', 'birthDate', 'dniNumber', 'dniLetter');
        expect(Object.keys(customer)).toHaveLength(5);
        expect(Object.keys(customer).length).not.toBeGreaterThan(5);
        expect(Object.keys(customer)).not.toBeNull();
    });

    test('Check customer getters methods', () => {
        expect(customer.getName()).toEqual(expect.stringMatching('Leopoldo'));
        expect(customer.getLastName()).toEqual(expect.stringMatching('Alas'));
        expect(customer.getBirthDate()).toBe('1991/02/15');
        expect(customer.getDniNumber()).toEqual(22738795);
        expect(customer.getDniLetter()).toEqual(expect.stringMatching('Y'));
        expect(customer.getDniNumber()).not.toEqual(0);
        expect(customer.getDniLetter()).not.toBeUndefined();
    });

    test('Check prototype of booking is defined', () => {
        let customerWithoutProto = {
            name: 'James',
            lastName: 'Hunt',
            birthDate: '1993/06/15',
            dniNumber: 17608824,
            dniLetter: 'R'
        };

        expect(Customer.isPrototypeOf(customer)).toBeTruthy();
        expect(Customer.isPrototypeOf(customerWithoutProto)).toBeFalsy()
        expect(Object.getPrototypeOf(customer) === Customer).toBeTruthy();
        expect(Object.getPrototypeOf(customerWithoutProto) === Customer).toBeFalsy();

        //* Set prototype Customer *//
        Customer.setPrototypeCustomer(customerWithoutProto);

        expect(Customer.isPrototypeOf(customerWithoutProto)).toBeTruthy();
        expect(Object.getPrototypeOf(customerWithoutProto) === Customer).toBeTruthy();
    });

    test('Check customer is an adult, over 18 years old', () => {
        var child = Object.create(Customer)._init('Sheldon', 'Cooper', '2008/06/09', 12345678, 'T');
        var twentyOneYears = Object.create(Customer)._init('I\'m 21 years', 'Old', '2001/01/07', 12345678, 'T');
        var twentyYears = Object.create(Customer)._init('I\'m 20 years', 'Old', '2002/01/07', 12345678, 'T');
        expect(customer.checkIsAdult()).toBeTruthy();
        expect(twentyOneYears.checkIsAdult()).toBeTruthy();
        expect(child.checkIsAdult()).toBeFalsy();
        expect(twentyYears.checkIsAdult()).toBeFalsy();
    })

    test('Check the dni letter is correct for the dni number specified', () => {
        var dniValid =  Object.create(Customer)._init('David', 'Bowie', '1947/01/08', '04649048', 'N');
        var dniNotValidLetters = Object.create(Customer)._init('David', 'Bowie', '1947/01/08', '30147966', 'I');
        var dniNotValidWrongNumber = Object.create(Customer)._init('David', 'Bowie', '1947/01/08', 90707250, 'J');
        var dniNotValidCharacters = Object.create(Customer)._init('David', 'Bowie', '1947/01/08', 'ADBGETDR', 'T');
        expect(customer.checkValidDni()).toBeTruthy();
        expect(dniValid.checkValidDni()).toBeTruthy();
        expect(dniNotValidLetters.checkValidDni()).toBeFalsy();
        expect(dniNotValidWrongNumber.checkValidDni()).toBeFalsy();
        expect(dniNotValidCharacters.checkValidDni()).toBeFalsy();
    });
});