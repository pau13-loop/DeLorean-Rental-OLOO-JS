const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const db = require('../db/connection/mongo-config');
const BookingModel = require('../db/models/booking');
const VehicleModel = require('../db/models/vehicle');
const CustomerModel = require('../db/models/customer');
const bookingCollection = require('../db/collections/bookings-collection');
const customerCollection = require('../db/collections/customers-collection');
const vehicleCollection = require('../db/collections/vehicle-collection-short-list')

describe("Booking Routes", () => {

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.disconnect();
    });

    describe("Bokking FIND test cases", () => {

        beforeAll(async () => {
            await BookingModel.insertMany(bookingCollection);
        }, 10000);

        afterAll(async () => {
            await BookingModel.deleteMany();
        }, 10000);

        // FIND ALL

        test("Test get all bookings /booking", () => {
            return request(app)
                .get('/booking')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBeGreaterThan(3);
                    expect(res.body.data).toEqual(
                        expect.arrayContaining([
                            // Ids
                            expect.objectContaining({ id: '61d9da9122e2b4614b1c7afb' }),
                            expect.objectContaining({ id: '61d9da984292aa2f665d71d7' }),
                            expect.objectContaining({ id: '61d9da9c8886061930a91e2d' }),
                            expect.objectContaining({ id: '61d9da9f7c664f0817d33034' })
                        ])
                    );
                });
        }, 10000);

        // FIND ONE BY CUSTOMER ID

        test("Test get one booking by customer id /booking/:key/:value", () => {
            let customerId = '61d9d05c823d65cd8ca11194'; // Travis Bickle
            return request(app)
                .get(`/booking/customer/${customerId}`)
                .then(res => {
                    // Received: "application/json; charset=utf-8"
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'startDate', 'endDate', 'customer', 'vehicle');
                    expect(res.body.data).not.toHaveProperty('_id', 'booking');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.id).toBe('61d9da9f7c664f0817d33034');
                    expect(res.body.data.startDate).toEqual(expect.stringMatching('2022/01/04'));
                    expect(res.body.data.endDate).toEqual(expect.stringMatching('2022/01/08'));
                    expect(res.body.data.customer).toBe("61d9d05c823d65cd8ca11194");
                    expect(res.body.data.vehicle).toEqual("61d9d42d2338c9151f929b57");
                });
        }, 10000);

        // FIND ONE BY ID

        test("Test get one booking by booking id /booking/:key/:value", () => {
            let bookingId = '61d9da984292aa2f665d71d7'; // Booking of customer Baby with vehicle Bumblebee
            return request(app)
                .get(`/booking/id/${bookingId}`)
                .then(res => {
                    // Received: "application/json; charset=utf-8"
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'startDate', 'endDate', 'customer', 'vehicle');
                    expect(res.body.data).not.toHaveProperty('_id', 'booking');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.id).toBe('61d9da984292aa2f665d71d7');
                    expect(res.body.data.startDate).toEqual(expect.stringMatching('2021/07/02'));
                    expect(res.body.data.endDate).toEqual(expect.stringMatching('2020/08/02'));
                    expect(res.body.data.customer).toBe("61d9d064930c2597348b8a75");
                    expect(res.body.data.vehicle).toEqual("61d9d42831baf5c7f0104c94");
                });
        }, 10000);

    }, 10000);

    describe("Booking DELETE test cases", () => {

        beforeAll(async () => {
            await BookingModel.insertMany(bookingCollection);
        }, 10000);

        afterAll(async () => {
            await BookingModel.deleteMany();
        }, 10000);

        // DELETE ONE BY ID

        test("Test delete booking by id /booking/delete/:key/:value", () => {
            let bookingId = '61d9da9122e2b4614b1c7afb'; // Booking of customer McFly with vehicle DeLorean
            return request(app)
                .delete(`/booking/delete/id/${bookingId}`)
                .then(res => {
                    // No content, status code 204
                    expect(res.statusCode).toEqual(204);
                    expect(res.body.data).toBeUndefined();
                    expect(res.body.data).toBeFalsy();
                });
        }, 10000);

        test("Test booking has been deleted succesfully by id", () => {
            return request(app)
                .get('/booking')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toEqual(
                        expect.arrayContaining([
                            // Ids
                            expect.objectContaining({ id: '61d9da984292aa2f665d71d7' }),
                            expect.objectContaining({ id: '61d9da9c8886061930a91e2d' }),
                            expect.objectContaining({ id: '61d9da9f7c664f0817d33034' }),
                            expect.not.objectContaining({ id: '61d9da9122e2b4614b1c7afb' })
                        ])
                    );
                });
        }, 10000);
    }, 10000);

    describe("Booking CREATE test cases", () => {

        beforeAll(async () => {
            await BookingModel.insertMany(bookingCollection);
        }, 10000);

        afterAll(async () => {
            await BookingModel.deleteMany();
        }, 10000);

        //! Can Throw error
        test("Test create booking", () => {
            return request(app)
                .post('/booking/create')
                .send({ "startDate": "2022/02/15", "endDate": "2022/02/21", "dniNumber": 17608824, "dniLetter": "R", "vehicleModel": "Bumblebee", "vehicleBrand": "Chevrolet" })
                .then(res => {
                    console.log('Response body: ', res.body)
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toHaveProperty('id', 'startDate', 'endDate', 'customer', 'vehicle');
                    expect(res.body.data.customer).toEqual("61d9cfbbd1b9a9480b0c343e");
                    expect(res.body.data.vehicle).toEqual('61d9d42831baf5c7f0104c94');
                });
        }, 10000);

        //! Will fail if the test case above can not make the booking
        test("Test get all bookings /booking", () => {
            return request(app)
                .get('/booking')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(5);
                });
        }, 10000);

        //! Can Throw error
        test("Test create unsuccessfull booking by customer under age", () => {
            return request(app)
                .post('/booking/create')
                .send({ "startDate": "2022/05/20", "endDate": "2022/05/29", "dniNumber": 25668350, "dniLetter": "M", "vehicleModel": "Golf", "vehicleBrand": "volkswagen" })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toBeNull();
                    expect(res.body.message).toEqual(expect.stringMatching("Requested to make a booking couldn't be make, check parametres specified please and try again !"));
                });
        }, 10000);

        test("Test get all bookings /booking", () => {
            return request(app)
                .get('/booking')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).not.toBe(6);
                });
        }, 10000);
    }, 10000);
}, 10000);