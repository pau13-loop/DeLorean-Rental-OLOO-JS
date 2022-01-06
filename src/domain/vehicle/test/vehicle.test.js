const { expect } = require('@jest/globals');
var Vehicle = require('../vehicle');
var Category = require('../../category/category');

//! La category en el interior del describe me devuelve "ReferenceError: category is not defined", porque ???
var category = Object.create(Category).init('classic', 30);
var fordMustang = Object.create(Vehicle).init('mustang', 'ford', category, 4, 1999, 70, true);

//TODO: describe()
describe('Test object attributes and getters', () => {
    test('Check vehicle props accessed directly', () => {
        expect(fordMustang.model).toBe('mustang');
        expect(fordMustang.brand).toBe('ford');
        expect(fordMustang.price).toBe(70);
        expect(fordMustang.category).toBeDefined();
        expect(fordMustang.category).toBe(category);
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

    test('Getters properties vehicle', () => {
        expect(fordMustang.getModel()).toEqual(expect.stringMatching('mustang'));
        expect(fordMustang.getBrand()).toEqual(expect.stringMatching('ford'));
        expect(fordMustang.getCategory()).toEqual(category);
        expect(fordMustang.getPassengers()).toEqual(4);
        expect(fordMustang.getYear()).toBe(1999);
        expect(fordMustang.getPrice()).toBe(70);
        expect(fordMustang.getAvailable()).toBeTruthy();
        expect(fordMustang.getName()).toEqual(expect.stringMatching('ford mustang'));
    });
});

describe("Check unset prototype of random object", () => {
    let randomObject = {
        mode: "",
        brand: "",
        category: undefined,
        passengers: 0,
        year: 0,
        price: 0,
        available: true
    };
    test('Check prototype NOT set of Vehicle', () => {
        // Two different ways of check the prototype of an obj
        expect(Vehicle.isPrototypeOf(randomObject)).toBeFalsy();
        expect(Object.getPrototypeOf(randomObject) === Vehicle).toBeFalsy();
    });
})

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

    //TODO: beforeAll()
    beforeAll(() => {
        Vehicle.setPrototypeVehicle(newVehicle);
    });

    test('Check prototype of Vehicle already SET', () => {
        // Two different ways of check the prototype of an obj      
        expect(Vehicle.isPrototypeOf(newVehicle)).toBe(true);
        expect(Object.getPrototypeOf(newVehicle) === Vehicle).toBe(true);
    });

    test('Check ORIGINALPRICE property is defined but not enumerable', () => {
        expect(Object.keys(newVehicle)).toHaveLength(7);
        expect(Object.keys(newVehicle).length).not.toBeGreaterThan(7);
        expect(Object.keys(newVehicle)).not.toContain('ORIGINALPRICE');
        expect(newVehicle.ORIGINALPRICE).toBeDefined();
        expect(newVehicle.ORIGINALPRICE).not.toBeNull();
        expect(newVehicle).toHaveProperty('ORIGINALPRICE');
        expect(newVehicle.ORIGINALPRICE).toBeTruthy();
        expect(newVehicle.ORIGINALPRICE).toEqual(newVehicle.price);
    });

    test('Check ORIGINALPRICE property is NOT writeable', () => {
        expect(newVehicle.ORIGINALPRICE).toBe(15);
        newVehicle.ORIGINALPRICE += 5;
        expect(newVehicle.ORIGINALPRICE).not.toBe(20);
        expect(newVehicle.ORIGINALPRICE).toBe(15);
    });
});

describe('Tests for closure and update price', () => {

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

    //TODO: beforeAll()
    beforeAll(() => {
        Vehicle.setPrototypeVehicle(golf);
        Vehicle.setPrototypeVehicle(leon);
    });

    //TODO: beforeEach()
    beforeEach(() => {
        golf.price = golf.ORIGINALPRICE;
        leon.price = leon.ORIGINALPRICE;
    });

    //TODO: functionMock
    const percentageMock = jest
        .fn()
        .mockImplementation((priceVehicle) => priceVehicle * 0.4)
        .mockName('percentageMock');

    test('Check minimum price', () => {
        expect(leon.getMinPrice()).toBe(percentageMock(leon.price));
        expect(golf.getMinPrice()).toBe(percentageMock(golf.price));
    });

    test('Test closure get Personal Assitance', () => {
        golf.getPresonalAssistance('Mc Claren');

        expect(golf).toHaveProperty('personalAssistance');
        expect(golf.personalAssistance()).toEqual(expect.stringMatching('Assitance notified, please remain at your location Mc Claren'));

        expect(leon.hasOwnProperty('personalAssistance')).toBeFalsy();

        let vehicleProto = Object.getPrototypeOf(Vehicle);
        expect(vehicleProto).not.toHaveProperty('personalAssistance');
    });

    // Set current year
    Date.now = jest
        .fn(() => new Date());

    const updateLeonPrice = jest
        .fn()
        .mockImplementation((ORIGINALPRICE, year) => Math.round(ORIGINALPRICE - ORIGINALPRICE * (0.1 * (Date.now().getFullYear() - year))))
        .mockName('updateLeonPrice');

    test('Update price vehicles', () => {
        expect(golf.getPrice()).toBe(35);
        expect(leon.getPrice()).toBe(20);

        golf.updatePrice();
        leon.updatePrice();

        expect(golf.price).toBe(35);
        expect(leon.price).toBe(updateLeonPrice(leon.ORIGINALPRICE, leon.year));

        // Change year
        Date.now = jest
            .fn(() => new Date(2023, 1, 1));

        golf.updatePrice();
        leon.updatePrice();

        expect(Date.now().getFullYear()).toBe(2023);
        expect(golf.price).toBe(35);
        expect(leon.price).toBe(updateLeonPrice(leon.ORIGINALPRICE, leon.year));
    });

    // This test case is in conflict with another one, bcs by executed alone get passed but in group fails
    test('Try to update price under minimum, return min price', () => {
        expect(golf.getPrice()).toBe(35);
        expect(leon.getPrice()).toBe(20);

        // Change year
        Date.now = jest
            .fn(() => new Date(2030, 1, 1));

        golf.updatePrice();
        leon.updatePrice();

        expect(Date.now().getFullYear()).toBe(2030);
        expect(golf.price).toBe(35);
        expect(leon.price).toBe(leon.getMinPrice());
    });
});