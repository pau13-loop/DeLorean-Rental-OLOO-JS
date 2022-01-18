
const { expect } = require('@jest/globals');
var Vehicle = require('../vehicle');
var Category = require('../../category/category');

var category = Object.create(Category)._init('classic', 30);
var fordMustang = Object.create(Vehicle)._init('mustang', 'ford', category, 1999, 70, 70, true);

//TODO: describe()
describe('Test object attributes and getters', () => {
    test('Check vehicle props accessed directly', () => {
        expect(fordMustang.model).toBe('mustang');
        expect(fordMustang.brand).toBe('ford');
        expect(fordMustang.price).toBe(70);
        expect(fordMustang.ORIGINAL_PRICE).toEqual(fordMustang.price);
        expect(fordMustang.category).toBeDefined();
        expect(fordMustang.category).toBe(category);
        expect(fordMustang.year).toBe(1999);
        expect(fordMustang.isAvailable).toBe(true);
        // Random test not.toBe()
        expect(fordMustang.brand).not.toBe('seat');
        expect(fordMustang.price).not.toBeNull();
        expect(fordMustang.isAvailable).not.toBeFalsy();
        expect(fordMustang.category).not.toBeNaN();
    });

    test('Check vehicle properties', () => {
        expect(fordMustang).toHaveProperty('model');
        expect(fordMustang).toHaveProperty('brand');
        expect(fordMustang).toHaveProperty('category');
        expect(fordMustang).toHaveProperty('year');
        expect(fordMustang).toHaveProperty('price');
        expect(fordMustang).toHaveProperty('ORIGINAL_PRICE');
        expect(fordMustang).toHaveProperty('isAvailable');
        // Random prop check
        expect(fordMustang).not.toHaveProperty('aquatic');
    });

    test('Getters properties vehicle', () => {
        expect(fordMustang.getModel()).toEqual(expect.stringMatching('mustang'));
        expect(fordMustang.getBrand()).toEqual(expect.stringMatching('ford'));
        expect(fordMustang.getCategory()).toEqual(category);
        expect(fordMustang.getYear()).toBe(1999);
        expect(fordMustang.getPrice()).toBe(70);
        expect(fordMustang.getOriginalPrice()).toEqual(70);
        expect(fordMustang.getIsAvailable()).toBeTruthy();
        expect(fordMustang.getName()).toEqual(expect.stringMatching('ford mustang'));
    });
});

describe("Check unset prototype of random object", () => {
    let newVehicle = {
        mode: "clio",
        brand: "renault",
        category: category,
        year: 2019,
        price: 25,
        ORIGINAL_PRICE: 25,
        isAvailable: true
    };

    //TODO: afterEach()
    afterEach(() => {
        Vehicle.setPrototypeVehicle(newVehicle);
    });

    test('Check prototype NOT set of Vehicle', () => {
        expect(Vehicle.isPrototypeOf(newVehicle)).toBeFalsy();
        expect(Object.getPrototypeOf(newVehicle) === Vehicle).toBeFalsy();
    });

    test('Check prototype of Vehicle already SET', () => {
        expect(Vehicle.isPrototypeOf(newVehicle)).toBeTruthy();
        expect(Object.getPrototypeOf(newVehicle) === Vehicle).toBeTruthy();
    });
});

describe("Check book vehicle and finish booking", () => {
    test('Check booking is made correctly', () => {
        expect(fordMustang.getIsAvailable()).toBeTruthy();
        expect(fordMustang.getIsAvailable()).not.toBeFalsy();

        // book vehicle
        fordMustang.bookVehicle();

        expect(fordMustang.getIsAvailable()).toBeFalsy();
        expect(fordMustang.getIsAvailable()).not.toBeTruthy();
    });

    test("Check booking is finished correctly", () => {
        expect(fordMustang.getIsAvailable()).toBeFalsy();
        expect(fordMustang.getIsAvailable()).not.toBeTruthy();

        // unbook vehicle
        fordMustang.finishBookingVehicle();

        expect(fordMustang.getIsAvailable()).toBeTruthy();
        expect(fordMustang.getIsAvailable()).not.toBeFalsy();
    })
});

describe('Tests for closure and update price', () => {

    // CATEGORIES
    var commonCategory = Object.create(Category)._init('common', 60, 15);
    var classicCategory = Object.create(Category)._init('classic', 40, 20);

    // VEHICLES
    var golf = {
        mode: "golf",
        brand: "volkswagen",
        category: commonCategory,
        year: 2019,
        price: 35,
        ORIGINAL_PRICE: 35,
        isAvailable: true
    };

    var leon = {
        mode: "leon",
        brand: "seat",
        category: commonCategory,
        year: 2018,
        price: 20,
        ORIGINAL_PRICE: 35,
        isAvailable: true
    };

    var herbie = {
        model: "Herbie Torero",
        brand: "Volkswagen",
        category: classicCategory,
        year: 1980,
        price: 45,
        ORIGINAL_PRICE: 45,
        isAvailable: true
    }

    //TODO: beforeAll()
    beforeAll(() => {
        Vehicle.setPrototypeVehicle(golf);
        Vehicle.setPrototypeVehicle(leon);
        Vehicle.setPrototypeVehicle(herbie);
    });

    //TODO: functionMock
    const minVehiclePriceMock = jest
        .fn()
        .mockImplementation((ORIGINAL_PRICE_VEHICLE) => ORIGINAL_PRICE_VEHICLE - (ORIGINAL_PRICE_VEHICLE * 0.4))
        .mockName('percentageMock');

    test('Check minimum price calculated correctly', () => {
        expect(leon.getMinPrice()).toBe(minVehiclePriceMock(leon.ORIGINAL_PRICE));
        expect(golf.getMinPrice()).toBe(minVehiclePriceMock(golf.ORIGINAL_PRICE));
    });

    test('Test closure get Personal Assitance', () => {
        golf.getPresonalAssistance('Mc Claren');

        expect(golf).toHaveProperty('personalAssistance');
        expect(golf.personalAssistance()).toEqual(expect.stringMatching('Assitance notified, please remain at your location Mc Claren'));

        expect(leon.hasOwnProperty('personalAssistance')).toBeFalsy();

        let vehicleProto = Object.getPrototypeOf(Vehicle);
        expect(vehicleProto).not.toHaveProperty('personalAssistance');
    });

    //* Set current year
    Date.now = jest
        .fn(() => new Date());

    const updateVehiclePriceMock = jest
        .fn()
        .mockImplementation((ORIGINAL_PRICE_VEHICLE, yearVehicle) => Math.round(ORIGINAL_PRICE_VEHICLE - ORIGINAL_PRICE_VEHICLE * (0.1 * (Date.now().getFullYear() - yearVehicle))))
        .mockName('updateVehiclePriceMock');

    test('Update price vehicles', () => {
        expect(golf.getPrice()).toBe(35);
        expect(leon.getPrice()).toBe(20);
        expect(herbie.getPrice()).toBe(45);

        golf.updatePrice();
        leon.updatePrice();
        herbie.updatePrice();

        expect(golf.price).toBe(updateVehiclePriceMock(golf.ORIGINAL_PRICE, golf.year));
        expect(leon.price).toBe(updateVehiclePriceMock(leon.ORIGINAL_PRICE, leon.year));
        expect(herbie.price).toBe(45);

        // Change year
        Date.now = jest
            .fn(() => new Date(2030, 1, 1));

        golf.updatePrice();
        leon.updatePrice();
        herbie.updatePrice();

        // By change the year we made the price after the update be under the minimum
        expect(Date.now().getFullYear()).toBe(2030);
        expect(golf.price).toBe(minVehiclePriceMock(golf.ORIGINAL_PRICE));
        expect(leon.price).toBe(minVehiclePriceMock(leon.ORIGINAL_PRICE));
        expect(herbie.price).toBe(45);
    });
});