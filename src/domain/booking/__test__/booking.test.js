const { expect } = require('@jest/globals');
const Booking = require('../booking');
const Customer = require('../../customer/customer');
const Vehicle = require('../../vehicle/vehicle');
const Category = require('../../category/category');

var marty = Object.create(Customer).init('Marty', '1985/12/02', 12345678, 'Z');
var classic = Object.create(Category).init('classic', 40);
var deLorean = Object.create(Vehicle).init('DeLorean', 'Motor Company', classic, 4, 1982, 30, true);
var martyBooking = Object.create(Booking).init('2021/01/02', '2021/01/20', marty, deLorean);


describe(
    'Define booking, vehicle, category and customer to test the getters of the booking and the domain logic', () => {
        test('Check booking properties', () => {
            expect(martyBooking).toHaveProperty('startDate', 'endDate', 'customer', 'vehicle');
            expect(Object.keys(martyBooking)).toHaveLength(4);
            expect(martyBooking).not.toBeUndefined();
        });

        test('Check booking getters methods', () => {
            expect(martyBooking.getStartDate()).toEqual('2021/01/02');
            expect(martyBooking.getEndDate()).toEqual(expect.stringMatching('2021/01/20'));
            expect(martyBooking.getCustomer()).toBe(marty);
            expect(martyBooking.getVehicle()).not.toBeUndefined();
            expect(martyBooking.getVehicle()).toBe(deLorean);
        });
    })

describe('Booking domain logic methods testing', () => {

    var bookingOfFiveDays = Object.create(Booking).init('2021/01/01', '2021/01/05', marty, deLorean);
    var bookingWrongDateFormat = Object.create(Booking).init('02-05-2020', '20052020', marty, deLorean);
    var bookingEndBeforeStart = Object.create(Booking).init('2021/01/02', '2020/12/25', marty, deLorean);

    test('Calculate total number of days of booking', () => {
        const differenceBtwDaysMock = jest
            .fn()
            .mockImplementation((dateStart, dateEnd) =>
                Math.ceil((new Date(dateEnd) - new Date(dateStart)) / (1000 * 3600 * 24)) + 1
            )
            .mockName('differenceBtwDaysMock');

        expect(bookingOfFiveDays.calculateBookingDaysNum()).toEqual(differenceBtwDaysMock(bookingOfFiveDays.startDate, bookingOfFiveDays.endDate));
        expect(bookingOfFiveDays.calculateBookingDaysNum()).toBe(5);
        expect(martyBooking.calculateBookingDaysNum()).toEqual(differenceBtwDaysMock(martyBooking.startDate, martyBooking.endDate));
        expect(martyBooking.calculateBookingDaysNum()).toBe(19);
        expect(bookingWrongDateFormat.calculateBookingDaysNum()).toBeFalsy();
        expect(bookingEndBeforeStart.calculateBookingDaysNum()).not.toBeTruthy();
        expect(bookingEndBeforeStart.calculateBookingDaysNum()).toBeFalsy();
    });

    test('Calculate booking price', () => {
        const mockCalculatePrice = jest
            .fn()
            .mockImplementation((price, totalDaysNum) => price * totalDaysNum)
            .mockName('mockCalculatePrice');

        expect(bookingWrongDateFormat.calculatePriceBooking()).toBeNull();
        expect(bookingEndBeforeStart.calculatePriceBooking()).toBeFalsy();
        expect(martyBooking.calculatePriceBooking()).toBe(570);
        expect(bookingOfFiveDays.calculatePriceBooking()).not.toBeUndefined();
        expect(bookingOfFiveDays.calculatePriceBooking()).toBe(30 * 5);
        expect(bookingOfFiveDays.calculatePriceBooking()).toEqual(mockCalculatePrice(bookingOfFiveDays.vehicle.price, bookingOfFiveDays.calculateBookingDaysNum()));
        expect(bookingOfFiveDays.calculatePriceBooking()).toBe(150);
    });
})