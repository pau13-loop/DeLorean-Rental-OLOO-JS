
const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const db = require('../db/connection/mongoConfig');
const responseFormatter = require('../utils/responseFormatter');

describe("Vehicle Routes FINDS", () => {

    beforeAll(async () => {
        await db.connect()
    });

    afterAll(async () => {
        await db.disconnect()
    });

    //FIND ALL

    //! En un futuro deberá cambiarse por el número de vehiculos de producción
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
                expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'passengers', 'year', 'price', 'available');
                expect(res.body.data.model).toEqual(expect.stringMatching('Clio'));
                expect(res.body.data.brand).toEqual(expect.stringMatching('renault'));
                expect(res.body.data.passengers).toBe(5);
                expect(res.body.data.year).toBe(2018);
                expect(res.body.data.price).toBe(10);
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
                expect(res.body.data).toHaveProperty('id', 'model', 'brand', 'category', 'passengers', 'year', 'price', 'available');
                expect(res.body.data.model).toEqual(expect.stringMatching('DeLorean'));
                expect(res.body.data.brand).toEqual(expect.stringMatching('Motor Company'));
                expect(res.body.data.category).toBe("61b0f62a88d0be4b41bc1003");
                expect(res.body.data.passengers).toBe(4);
                expect(res.body.data.year).toBe(1983);
                expect(res.body.data.price).toBe(35);
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
                expect(res.body.data.length).toBe(7);
                expect(res.body).not.toBeNull();
            });
    }, 100000);

    // DELETE BY NAME

    test("Test delete vehicle by name /vehicle/delete/:key/:value", () => {
        let name = 'clio';
        return request(app)
            .delete(`/vehicle/delete/name/${name}`)
            .then(res => {
                // No content, status code 204
                // expect(res.get('Content-Type')).toEqual(expect.stringMatching('text/html; charset=utf-8'));
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
                // expect(res.get('Content-Type')).toEqual(expect.stringMatching('text/html; charset=utf-8'));
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