
const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const db = require('../db/mongoConfig');

describe("Vehicle Routes FINDS", () => {

    beforeAll(async () => {
        await db.connect()
    });

    afterAll(async () => {
        await db.disconnect()
    });

    //FIND ALL

    //! En uin futuro deberá cambiarse por el número de vehiculos de producción
    test("Test get all vehicles /vehicle", () => {
        return request(app)
            .get('/vehicle')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toBe(2);
                expect(res.body).not.toBeNull();
            });
    }, 100000);

    // FIND ONE

    test('Test Find One vehicle /vehicle/:name', () => {
        let name = 'clio';
        return request(app)
            .get(`/vehicle/${name}`)
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('_id', 'model', 'brand', 'category', 'passengers', 'year', 'price', 'available');
                expect(res.body.model).toEqual(expect.stringMatching('clio'));
                expect(res.body.passengers).toBe(5);
                expect(res.body.price).toBe(20);
                expect(res.body).not.toHaveProperty('id', 'name');
                expect(res.body._id).not.toBeNull();
                expect(res.body.name).not.toBeDefined();
            });
    }, 10000);

    // DELETE 

    test("Test delete vehicle /vehicle/delete/:name", () => {
        let name = 'clio';
        return request(app)
            .get(`/vehicle/delete/${name}`)
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('_id', 'model', 'brand', 'category', 'passengers', 'year', 'price', 'available');
                expect(res.body.name).toEqual(expect.stringMatching('clio'));
                expect(res.body.passengers).toBe(5);
                expect(res.body.price).toBe(20);
            });
    }, 10000);

    test('Test vehicle has been deleted successfully /vehicle', () => {
        return request(app)
            .get('/vehicle')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toBe(1);
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({ model: 'clio' }),
                        expect.objectContaining({ discountTax: 60 }),
                        expect.objectContaining({ discountTax: 20 }),
                    ])
                );
            });
    }, 1000)
}, 10000);