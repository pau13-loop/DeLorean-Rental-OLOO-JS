const { expect } = require('@jest/globals');
var Vehicle = require('../vehicle');
var Category = require('../../Category/category');
const { getName } = require('../vehicle');

describe('Define vehicle and category for getters test cases', () => {

    var category = Object.create(Category).init('classic', 30);
    var fordMustang = Object.create(Vehicle).init('ford', 'mustang', 'red', category);

    test('Get properties vehicle', () => {
        expect(fordMustang.getBrand()).toBe('Car brand: ford');
        expect(fordMustang.getModel()).toBe('Car model: mustang');
        expect(fordMustang.getName()).toBe('Car name: ford mustang');
        expect(fordMustang.getColor()).toBe('Car color: red');
    });

    test('Get properties vehicle category', () => {
        expect(fordMustang.getCategory().getName()).toBe('Category name: classic');
        expect(fordMustang.getCategory().getDiscountTax()).toBe('Category discount tax: 30');
    })


})