const { expect } = require('@jest/globals');
const Rental = require('../rental');
const Customer = require('../../customer/customer');
const Vehicle = require('../../vehicle/vehicle');
const Category = require('../../category/category');

var marty = Object.create(Customer).init('Marty', '1985/12/02', 12345678, 'Z');
var classic = Object.create(Category).init('classic', 40);
var deLorean = Object.create(Vehicle).init('DeLorean', 'Motor Company', classic, 4, 1982, 30, true);
var martyRental = Object.create(Rental).init('2021/01/02', '2021/01/20', marty, deLorean);


describe(
    'Define rental, vehicle, category and customer to test the getters of the rental and the domain logic', () => {
        test('Check rental properties', () => {
            expect(martyRental).toHaveProperty('startDate', 'endDate', 'customer', 'vehicle');
            expect(Object.keys(martyRental)).toHaveLength(4);
            expect(martyRental).not.toBeUndefined();
        });

        test('Check rental getters methods', () => {
            expect(martyRental.getStartDate()).toEqual('2021/01/02');
            expect(martyRental.getEndDate()).toEqual(expect.stringMatching('2021/01/20'));
            expect(martyRental.getCustomer()).toBe(marty);
            expect(martyRental.getVehicle()).not.toBeUndefined();
            expect(martyRental.getVehicle()).toBe(deLorean);
        });
    })

describe('Rental domain logic methods testing', () => {

    var rentalOfFiveDays = Object.create(Rental).init('2021/01/01', '2021/01/05', marty, deLorean);
    var rentalWrongDateFormat = Object.create(Rental).init('02-05-2020', '20052020', marty, deLorean);
    var rentalEndBeforeStart = Object.create(Rental).init('2021/01/02', '2020/12/25', marty, deLorean);

    test('Calculate total number of days of booking', () => {
        const differenceBtwDaysMock = jest
            .fn()
            .mockImplementation((dateStart, dateEnd) =>
                Math.ceil((new Date(dateEnd) - new Date(dateStart)) / (1000 * 3600 * 24)) + 1
            )
            .mockName('differenceBtwDaysMock');

        expect(rentalOfFiveDays.calculateBookingDaysNum()).toEqual(differenceBtwDaysMock(rentalOfFiveDays.startDate, rentalOfFiveDays.endDate));
        expect(rentalOfFiveDays.calculateBookingDaysNum()).toBe(5);
        expect(martyRental.calculateBookingDaysNum()).toEqual(differenceBtwDaysMock(martyRental.startDate, martyRental.endDate));
        expect(martyRental.calculateBookingDaysNum()).toBe(19);
        expect(rentalWrongDateFormat.calculateBookingDaysNum()).toBeFalsy();
        expect(rentalEndBeforeStart.calculateBookingDaysNum()).not.toBeTruthy();
        expect(rentalEndBeforeStart.calculateBookingDaysNum()).toBeFalsy();
    });

    test('Calculate rental price', () => {
        const mockCalculatePrice = jest
            .fn()
            .mockImplementation((price, totalDaysNum) => price * totalDaysNum)
            .mockName('mockCalculatePrice');

        expect(rentalWrongDateFormat.calculatePriceRental()).toBeNull();
        expect(rentalEndBeforeStart.calculatePriceRental()).toBeFalsy();
        expect(martyRental.calculatePriceRental()).toBe(570);
        expect(rentalOfFiveDays.calculatePriceRental()).not.toBeUndefined();
        expect(rentalOfFiveDays.calculatePriceRental()).toBe(30 * 5);
        expect(rentalOfFiveDays.calculatePriceRental()).toEqual(mockCalculatePrice(rentalOfFiveDays.vehicle.price, rentalOfFiveDays.calculateBookingDaysNum()));
        expect(rentalOfFiveDays.calculatePriceRental()).toBe(150);
    });
})