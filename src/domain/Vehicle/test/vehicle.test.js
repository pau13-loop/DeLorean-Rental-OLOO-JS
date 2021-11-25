const { expect } = require('@jest/globals');
var Vehicle = require('../vehicle');
var Category = require('../../Category/category');

describe('Define vehicle and category for getters test cases', () => {

    var category = Object.create(Category).init('classic', 30);
    var fordMustang = Object.create(Vehicle).init('ford', 'mustang', 'red', 70, category);

    test('Get properties vehicle', () => {
        expect(fordMustang.getBrand()).toBe('Vehicle brand: ford');
        expect(fordMustang.getModel()).toBe('Vehicle model: mustang');
        expect(fordMustang.getName()).toBe('Vehicle name: ford mustang');
        expect(fordMustang.getColor()).toBe('Vehicle color: red');
        expect(fordMustang.getPrice()).toBe('Vehicle price: 70');
    });

    test('Get properties vehicle category', () => {
        expect(fordMustang.getCategory().getName()).toBe('Category name: classic');
        expect(fordMustang.getCategory().getDiscountTax()).toBe('Category discount tax: 30');
    });

    test('Update vehicle price', () => {
        let percentatgeOfSeventy = Math.floor((100 * 30) / 70);
        fordMustang.updatePrice();
        console.log('Vehicle___', fordMustang);
        expect(fordMustang.getPrice()).toBe(`Vehicle price: ${percentatgeOfSeventy}`);
        expect(fordMustang.getUpdatedPrice()).toBe(`Discount applied successfully! \nPrice: ${percentatgeOfSeventy}`);
    })
})