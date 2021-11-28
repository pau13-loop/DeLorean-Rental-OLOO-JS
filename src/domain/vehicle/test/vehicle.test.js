const { expect } = require('@jest/globals');
var Vehicle = require('../vehicle');
var Category = require('../../category/category');

/**
 * TODO
 * Faltan por testear:
 * - toBeInstanceOf()
 * - ToBeFalsy()
 * - ToBeTruthy()
 *  */

describe('Define vehicle and category for getters test cases', () => {

    var category = Object.create(Category).init('classic', 30);
    var fordMustang = undefined;

    beforeEach(() => {
        fordMustang = Object.create(Vehicle).init('ford', 'mustang', 'red', 70, category);
    });

    test('Check vehicle props accessed directly', () => {
        expect(fordMustang.brand).toBe('ford');
        expect(fordMustang.model).toBe('mustang');
        expect(fordMustang.color).toBe('red');
        expect(fordMustang.price).toBe(70);
        expect(fordMustang.originalPrice).toBeTruthy();
        //! Este caso test se tiene que ver si se puede eliminar ya que el precio puede cambiar, o puede venir alterado ???
        expect(fordMustang.originalPrice).toEqual(fordMustang.price);
        // Random test not.toBe()
        expect(fordMustang.brand).not.toBe('seat');
        expect(fordMustang.price).not.toBeNull();
        expect(fordMustang.category).not.toBeNaN();
    });


    test('Check vehicle properties', () => {
        expect(fordMustang).toHaveProperty('brand');
        expect(fordMustang).toHaveProperty('model');
        expect(fordMustang).toHaveProperty('color');
        expect(fordMustang).toHaveProperty('price');
        expect(fordMustang).toHaveProperty('originalPrice');
        expect(fordMustang).toHaveProperty('category');
        // Random prop check
        expect(fordMustang).not.toHaveProperty('aquatic');
    });

    test('Check originalPrice property is defined but not enumerable', () => {
        expect(Object.keys(fordMustang)).toHaveLength(5);
        expect(Object.keys(fordMustang).length).not.toBeGreaterThan(5);
        expect(Object.keys(fordMustang)).not.toContain('originalPrice');
        expect(fordMustang.originalPrice).toBeDefined();
        expect(fordMustang.originalPrice).not.toBeNull();


    });

    test('Getters properties vehicle', () => {
        expect(fordMustang.getBrand()).toEqual(expect.stringMatching('ford'));
        expect(fordMustang.getModel()).toEqual(expect.stringMatching('mustang'));
        expect(fordMustang.getName()).toEqual(expect.stringMatching('ford mustang'));
        expect(fordMustang.getColor()).toEqual(expect.stringMatching('red'));
        expect(fordMustang.getPrice()).toBe(70);
        expect(fordMustang.getOriginalPrice()).toBe(70);
    });

    test('Check originalPrice property is writeable', () => {
        //? Accedo a la prop a traves del método getOriginalPrice() o accediendo directamente a su valor ???
        expect(fordMustang.getOriginalPrice()).toBe(70);
        fordMustang.originalPrice += 5;
        expect(fordMustang.getOriginalPrice()).not.toBe(75);
        expect(fordMustang.getOriginalPrice()).toBe(70);
    });

    // Probably check this in Category Prototype will be enough
    test('Get properties vehicle category', () => {
        expect(fordMustang.getCategory().getName()).toEqual(expect.stringMatching(('classic')));
        expect(fordMustang.getCategory().getDiscountTax()).toEqual(30);
    });

    test.only('Update price', () => {
        expect(fordMustang.getPrice()).toBe(70);
        let percentageOfFiveOverSeventy = 70 - 70 * 0.1;
        fordMustang.updatePrice();
        expect(fordMustang.getPrice()).toBe(percentageOfFiveOverSeventy);
    });

    test('Error try to update price under minimum', () => {
        expect(fordMustang.getPrice()).toBe(70);
        fordMustang.price = 5;
        expect(fordMustang.getPrice()).toBe(5);
        fordMustang.updatePrice();
        expect(fordMustang.getPrice()).toBe(5);
    });

    //* Movidos a Category.test.js
    // test('Discount vehicle price', () => {
    //     // Get price before update
    //     expect(fordMustang.getPrice()).toBe(70);
    //     expect(fordMustang.getOriginalPrice()).toBe(70);
    //     // Update price
    //     let percentatgeOfSeventy = Math.floor((100 * 30) / 70);
    //     fordMustang.applyDiscount();
    //     // Check price has updated correcty but original price still with the same value
    //     expect(fordMustang.getPrice()).toBe(percentatgeOfSeventy);
    //     expect(fordMustang.getDiscountedPrice()).toBe(`Discount applied successfully! \nPrice: ${percentatgeOfSeventy}`);
    //     expect(fordMustang.getOriginalPrice()).toBe(70);
    // });

    // test('Error try to applyDiscount with price under minimum', () => {
    //     expect(fordMustang.getPrice()).toBe(70);
    //     fordMustang.price = 5;
    //     expect(fordMustang.getPrice()).toBe(5);
    //     expect(fordMustang.applyDiscount()).toEqual(expect.stringContaining(('Price can not go under minimum')));
    // })
})