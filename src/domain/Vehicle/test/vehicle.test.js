const { expect } = require('@jest/globals');
var Vehicle = require('../vehicle');
var Category = require('../../Category/category');

describe('Define vehicle and category for getters test cases', () => {

    var category = Object.create(Category).init('classic', 30);
    var fordMustang = undefined;

    beforeEach(() => {
        fordMustang = Object.create(Vehicle).init('ford', 'mustang', 'red', 70, category);
    });


    test('Check vehicle to have the required properties', () => {
        expect(fordMustang).toHaveProperty('brand');
        expect(fordMustang).toHaveProperty('model');
        expect(fordMustang).toHaveProperty('color');
        expect(fordMustang).toHaveProperty('price');
        expect(fordMustang).toHaveProperty('originalPrice');
        expect(fordMustang).toHaveProperty('category');
        // Random prop check
        expect(fordMustang).not.toHaveProperty('aquatic');
    });

    test('Get properties vehicle', () => {
        expect(fordMustang.getBrand()).toEqual(expect.stringContaining('Vehicle brand: ford'));
        expect(fordMustang.getModel()).toEqual(expect.stringContaining('Vehicle model: mustang'));
        expect(fordMustang.getName()).toEqual(expect.stringContaining('Vehicle name: ford mustang'));
        expect(fordMustang.getColor()).toEqual(expect.stringContaining('Vehicle color: red'));
        expect(fordMustang.getPrice()).toEqual(expect.stringContaining('Vehicle price: 70'));
        expect(fordMustang.getOriginalPrice()).toEqual(expect.stringContaining('Vehicle original price: 70'));
    });

    test('Check originalPrice property is defined but not enumerable', () => {
        expect(Object.keys(fordMustang).length).toBe(5);
        expect(fordMustang.originalPrice).toBeDefined();
    });

    test('Check originalPrice property is writeable', () => {
        //? Accedo a la prop a traves del método getOriginalPrice() o accediendo directamente a su valor ???
        expect(fordMustang.originalPrice).toBe(70);
        fordMustang.originalPrice += 5;
        expect(fordMustang.originalPrice).not.toBe(75);
        expect(fordMustang.originalPrice).toBe(70);
    });

    // Probably check this in Category Prototype will be enough
    test('Get properties vehicle category', () => {
        expect(fordMustang.getCategory().getName()).toEqual(expect.stringContaining(('Category name: classic')));
        expect(fordMustang.getCategory().getDiscountTax()).toEqual(expect.stringContaining(('Category discount tax: 30')));
    });

    test('Update price', () => {
        expect(fordMustang.getPrice()).toBe('Vehicle price: 70');
        let percentageOfFiveOverSeventy = 70 - 70 * 0.1;
        fordMustang.updatePrice();
        expect(fordMustang.getPrice()).toBe(`Vehicle price: ${percentageOfFiveOverSeventy}`);
    })

    test('Error try to update price under minimum', () => {
        expect(fordMustang.getPrice()).toBe('Vehicle price: 70');
        fordMustang.price = 5;
        expect(fordMustang.getPrice()).toBe('Vehicle price: 5');
        expect(fordMustang.updatePrice()).toEqual(expect.stringContaining(('Price can not go under minimum')));
    })

    test('Discount vehicle price', () => {
        // Get price before update
        expect(fordMustang.getPrice()).toBe('Vehicle price: 70');
        expect(fordMustang.getOriginalPrice()).toBe('Vehicle original price: 70');
        // Update price
        let percentatgeOfSeventy = Math.floor((100 * 30) / 70);
        fordMustang.applyDiscount();
        // Check price has updated correcty but original price still with the same value
        expect(fordMustang.getPrice()).toBe(`Vehicle price: ${percentatgeOfSeventy}`);
        expect(fordMustang.getDiscountedPrice()).toBe(`Discount applied successfully! \nPrice: ${percentatgeOfSeventy}`);
        expect(fordMustang.getOriginalPrice()).toBe('Vehicle original price: 70');
    });

    test('Error try to applyDiscount with price under minimum', () => {
        expect(fordMustang.getPrice()).toBe('Vehicle price: 70');
        fordMustang.price = 5;
        expect(fordMustang.getPrice()).toBe('Vehicle price: 5');
        expect(fordMustang.applyDiscount()).toEqual(expect.stringContaining(('Price can not go under minimum')));
    })
})