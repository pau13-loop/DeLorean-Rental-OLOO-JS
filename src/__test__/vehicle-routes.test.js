const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const db = require('../db/connection/mongo-config');
const VehicleModel = require('../db/models/vehicle');
const CategoryModel = require('../db/models/category');
const vehicleCollection = require('../db/collections/vehicle-collection');
const categoryCollection = require('../db/collections/category-collection');

describe("Vehicle Routes FINDS", () => {

    beforeAll(async () => {
        await db.connect()
    });

    afterAll(async () => {
        await db.disconnect()
    });

    describe("Vehicle FIND test cases", () => {
        beforeAll(async () => {
            await VehicleModel.insertMany(vehicleCollection);
        }, 10000);

        afterAll(async () => {
            await VehicleModel.deleteMany();
        }, 10000);

        //FIND ALL

        test("Test get all vehicles /vehicle", () => {
            return request(app)
                .get('/vehicle')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(10);
                    expect(res.body).not.toBeNull();
                });
        }, 100000);

        // FIND ONE BY NAME

        test('Test Find One vehicle by name /vehicle/:name', () => {
            let name = 'clio';
            return request(app)
                .get(`/vehicle/name/${name}`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'price', 'available');
                    expect(res.body.data.model).toEqual(expect.stringMatching('Clio'));
                    expect(res.body.data.brand).toEqual(expect.stringMatching('renault'));
                    expect(res.body.data.year).toBe(2018);
                    expect(res.body.data.price).toBe(30);
                    expect(res.body.data).not.toHaveProperty('_id', 'name');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.name).not.toBeDefined();
                });
        }, 10000);

        // FIND ONE BY ID

        test('Test Find One vehicle by id /vehicle/:key/:value', () => {
            let idVehicle = '61d9d41e563bce29bd5181c2';
            return request(app)
                .get(`/vehicle/id/${idVehicle}`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'price', 'available');
                    expect(res.body.data.model).toEqual(expect.stringMatching('DeLorean'));
                    expect(res.body.data.brand).toEqual(expect.stringMatching('Motor Company'));
                    expect(res.body.data.category).toBe("61b0f62a88d0be4b41bc1003");
                    expect(res.body.data.year).toBe(1983);
                    expect(res.body.data.price).toBe(65);
                    expect(res.body.data).not.toHaveProperty('_id', 'name');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.name).not.toBeDefined();
                });
        }, 10000);

        // FIND ALL AVAILABLES AND NON DUPLICATES
        test("Test get all vehicles /vehicle", () => {
            return request(app)
                .get('/vehicle/available')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(8);
                    expect(res.body).not.toBeNull();
                });
        }, 100000);
    }, 10000);

    describe("Vehicle DELETE test cases", () => {
        beforeAll(async () => {
            await VehicleModel.insertMany(vehicleCollection);
        }, 10000);

        afterAll(async () => {
            await VehicleModel.deleteMany();
        }, 10000);

        // DELETE BY NAME

        test("Test delete vehicle by name /vehicle/delete/:key/:value", () => {
            let name = 'clio';
            return request(app)
                .delete(`/vehicle/delete/name/${name}`)
                .then(res => {
                    // No content, status code 204
                    expect(res.statusCode).toEqual(204);
                    expect(res.body.data).toBeUndefined();
                    expect(res.body.data).toBeFalsy();
                });
        }, 10000);

        test('Test vehicle has been deleted by name successfully /vehicle', () => {
            return request(app)
                .get('/vehicle')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(9);
                });
        }, 1000)

        // DELETE BY ID
        test("Test delete vehicle by id /vehicle/delete/:key/:value", () => {
            let idVehicle = '61d9d42295bf779ca13223ac';
            return request(app)
                .delete(`/vehicle/delete/id/${idVehicle}`)
                .then(res => {
                    // No content, status code 204
                    expect(res.statusCode).toEqual(204);
                    expect(res.body.data).toBeUndefined();
                    expect(res.body.data).toBeFalsy();
                });
        }, 10000);

        test('Test vehicle has been deleted by id successfully /vehicle', () => {
            return request(app)
                .get('/vehicle')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(8);
                    expect(res.body).toEqual(
                        expect.not.arrayContaining([
                            // Just test that the array doesn't include the model name because in this case is the unique non matching field in the array from the car properties
                            expect.objectContaining({ model: 'Herbie Torero' })
                        ])
                    );
                });
        }, 1000)
    }, 10000);

    describe("Vehicle UPDATE test cases", () => {
        beforeAll(async () => {
            await VehicleModel.insertMany(vehicleCollection);
            await CategoryModel.insertMany(categoryCollection);
        }, 10000);

        afterAll(async () => {
            await VehicleModel.deleteMany();
            await CategoryModel.deleteMany();
        }, 10000);

        // UPDATE 

        test("Test update vehicle /vehicle/update/:value", () => {
            let vehicleId = '61d9d411abda96e0e0e59319';    // Tycan Turbo
            return request(app)
                .put(`/vehicle/update/${vehicleId}`)
                .send({ "model": "Tycan", "brand": "BMW", "category": "classic", "year": 2021, "price": 100, "ORIGINAL_PRICE": 100, "isAvailable": true })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'price', 'available');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.id).toBe('61d9d411abda96e0e0e59319');
                    expect(res.body.data.model).toEqual(expect.stringMatching('Tycan'));
                    expect(res.body.data.brand).toEqual(expect.stringMatching('BMW'));
                    // expect(res.body.data.category).toBe("classic");
                    expect(res.body.data.year).toEqual(2021);
                    expect(res.body.data.price).toEqual(100);
                    expect(res.body.data.isAvailable).toBeTruthy();
                });
        }, 10000);

        // UPDATE NON-EXISTENT VEHICLE

        test("Test update customer /vehicle/update/:value", () => {
            let vehicleId = '61d9d411abda96e0e0e59319a';    // non-existent
            return request(app)
                .put(`/vehicle/update/${vehicleId}`)
                .send({ "model": "Tycan", "brand": "BMW", "category": "classic", "year": 2021, "price": 100, "ORIGINAL_PRICE": 100, "isAvailable": true })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.status).toEqual(-1);
                    expect(res.body.data).toBeNull();
                });
        }, 10000);
    }, 10000);



    describe("Vehicle CREATE test cases", () => {
        beforeAll(async () => {
            await VehicleModel.insertMany(vehicleCollection);
            await CategoryModel.insertMany(categoryCollection);
        }, 10000);

        afterAll(async () => {
            await VehicleModel.deleteMany();
            await CategoryModel.deleteMany();
        }, 10000);

        // CREATE 

        test("Test create vehicle /vehicle/create", () => {
            return request(app)
                .post('/vehicle/create')
                .send({ "model": "Khalos", "brand": "Daewoo", "category": "common", "year": 2019, "price": 10, "ORIGINAL_PRICE": 10, "isAvailable": true })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'isAvailable')
                        ;
                    expect(res.body.data).not.toHaveProperty('ORIGINAL_PRICE');
                    expect(res.body.data.model).toEqual(expect.stringMatching('Khalos'));
                    expect(res.body.data.brand).toEqual(expect.stringMatching('Daewoo'));
                    expect(res.body.data.year).toBe(2019);
                    expect(res.body.data.price).toBe(10);
                    expect(res.body.data.isAvailable).toBeTruthy();
                });
        }, 10000);

        test("Test check vehicle has been created /vehicle", () => {
            return request(app)
                .get('/vehicle')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(11);
                });
        }, 10000);
    }, 10000);

    describe("Vehicle DISCOUNT TAX test cases", () => {
        beforeAll(async () => {
            await VehicleModel.insertMany(vehicleCollection);
            await CategoryModel.insertMany(categoryCollection);
        }, 10000);

        afterAll(async () => {
            await VehicleModel.deleteMany();
            await CategoryModel.deleteMany();
        }, 10000);

        test('Test Find One vehicle by name /vehicle/:name', () => {
            let name = 'clio';
            return request(app)
                .get(`/vehicle/name/${name}`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'price', 'available');
                    expect(res.body.data.price).toBe(30);
                });
        }, 10000);

        test('Test discount vehicles price by category tax /vehicle/update/stock/discount', () => {
            return request(app)
                .put('/vehicle/update/stock/discount')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.message).toEqual(expect.stringMatching("Request discount price vehicles succesfully"));
                    // Just discount price from vehicles are available
                    expect(res.body.data.length).toBe(9);
                });
        }, 10000);

        test('Test Find One vehicle by name /vehicle/:name', () => {
            let name = 'clio';
            return request(app)
                .get(`/vehicle/name/${name}`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'price', 'available');
                    expect(res.body.data.price).toBeLessThan(30);
                });
        }, 10000);
    }, 10000)

    describe("Vehicle UPDATE PRICE test cases", () => {
        beforeAll(async () => {
            await VehicleModel.insertMany(vehicleCollection);
            await CategoryModel.insertMany(categoryCollection);
        }, 10000);

        afterAll(async () => {
            await VehicleModel.deleteMany();
            await CategoryModel.deleteMany();
        }, 10000);

        test('Test Find One vehicle by name /vehicle/:name', () => {
            let name = 'clio';
            return request(app)
                .get(`/vehicle/name/${name}`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'price', 'available');
                    expect(res.body.data.price).toBe(30);
                });
        }, 10000);

        test('Test update vehicle price by years old /vehicle/update/stock/price', () => {
            return request(app)
                .put('/vehicle/update/stock/price')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.message).toEqual(expect.stringMatching("Request update price vehicles succesfully"));
                    // Just discount price from vehicles are available
                    expect(res.body.data.length).toBe(9);
                });
        }, 10000);

        test('Test Find One vehicle by name /vehicle/:name', () => {
            let name = 'clio';
            return request(app)
                .get(`/vehicle/name/${name}`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'year', 'price', 'available');
                    expect(res.body.data.price).toBeLessThan(30);
                });
        }, 10000);
    }, 10000);
}, 10000);