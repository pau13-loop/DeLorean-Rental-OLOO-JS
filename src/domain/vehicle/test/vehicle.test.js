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

var category = Object.create(Category).init('classic', 30);
var fordMustang = Object.create(Vehicle).init('mustang', 'ford', category, 4, 1999, 70, true);

test('Check vehicle props accessed directly', () => {
    expect(fordMustang.model).toBe('mustang');
    expect(fordMustang.brand).toBe('ford');
    expect(fordMustang.price).toBe(70);
    expect(fordMustang.category).toBeDefined();
    expect(fordMustang.year).toBe(1999);
    expect(fordMustang.available).toBe(true);
    // Random test not.toBe()
    expect(fordMustang.brand).not.toBe('seat');
    expect(fordMustang.price).not.toBeNull();
    expect(fordMustang.available).not.toBeFalsy();
    expect(fordMustang.category).not.toBeNaN();
});

test('Check vehicle properties', () => {
    expect(fordMustang).toHaveProperty('model');
    expect(fordMustang).toHaveProperty('brand');
    expect(fordMustang).toHaveProperty('category');
    expect(fordMustang).toHaveProperty('passengers');
    expect(fordMustang).toHaveProperty('year');
    expect(fordMustang).toHaveProperty('price');
    expect(fordMustang).toHaveProperty('available');
    // Random prop check
    expect(fordMustang).not.toHaveProperty('aquatic');
});

describe("Set prototype of Vehicle and check it's ORIGINALPRICE", () => {
    let newVehicle = {
        mode: "clio",
        brand: "renault",
        category: category,
        passengers: 5,
        year: 2019,
        price: 15,
        available: true
    };
    
    Vehicle.setPrototypeVehicle(newVehicle);
    
    test('Check prototype of', () => {        
        // Two different ways of check the prototype of an obj
        expect(Vehicle.isPrototypeOf(newVehicle)).toBe(true);
        expect(Object.getPrototypeOf(newVehicle) === Vehicle).toBe(true);
    });

    test('Check originalPrice property is defined but not enumerable', () => {
        expect(Object.keys(newVehicle)).toHaveLength(7);
        expect(Object.keys(newVehicle).length).not.toBeGreaterThan(7);
        expect(Object.keys(newVehicle)).not.toContain('ORIGINALPRICE');
        expect(newVehicle.ORIGINALPRICE).toBeDefined();
        expect(newVehicle.ORIGINALPRICE).not.toBeNull();
        expect(newVehicle).toHaveProperty('ORIGINALPRICE');
        expect(newVehicle.ORIGINALPRICE).toBeTruthy();
        expect(newVehicle.ORIGINALPRICE).toEqual(newVehicle.price);
    });
});

describe('Define vehicle and category for getters test cases', () => {

    // CATEGORIES
    var commonCategory = Object.create(Category).init('common', 60);
    var classicCategory = Object.create(Category).init('classic', 40);

    // VEHICLES
    var golf = {
        mode: "golf",
        brand: "volkswagen",
        category: classicCategory,
        passengers: 5,
        year: 1999,
        price: 35,
        available: true
    };

    var leon = {
        mode: "leon",
        brand: "seat",
        category: commonCategory,
        passengers: 5,
        year: 2018,
        price: 20,
        available: true
    };

    beforeEach(() => {

    });



    //? getCategory() no está testeado ???
    test('Getters properties vehicle', () => {
        expect(fordMustang.getBrand()).toEqual(expect.stringMatching('ford'));
        expect(fordMustang.getModel()).toEqual(expect.stringMatching('mustang'));
        expect(fordMustang.getName()).toEqual(expect.stringMatching('ford mustang'));
        expect(fordMustang.getPrice()).toBe(70);
        expect(fordMustang.getYear()).toBe(1999);
        expect(fordMustang.getAvailability()).toBeTruthy();
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

    test('Update price', () => {
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