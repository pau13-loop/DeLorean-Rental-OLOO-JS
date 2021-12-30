
const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const db = require('../db/mongoConfig');

/**
 * SCOPING
 * 
 * SETUP y TEARDOWN
 */

describe("Category Routes", () => {

    afterAll(async () => {
        // cierro la conexión a mongo
        // await app.get('db').close();
        db.disconnect();
    })

    //FIND ALL

    test("Test get all categories /category", () => {
        // sintaxis alternativa con supertest
        // Uso la de jest con codigo asincrono con promesas
        return request(app)
            .get('/category')
            .then(res => {
                // Received: "application/json; charset=utf-8"
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toBe(3);
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        // Ids
                        expect.objectContaining({ _id: '61b0f513646886f408bd0730' }),
                        expect.objectContaining({ _id: '61b0f513646886f408bd0731' }),
                        expect.objectContaining({ _id: '61b0f62a88d0be4b41bc1003' }),
                        // Names category
                        expect.objectContaining({ name: 'classic' }),
                        expect.objectContaining({ name: 'common' }),
                        expect.objectContaining({ name: 'premium' }),
                        // DiscountTax Categories
                        expect.objectContaining({ discountTax: 60 }),
                        expect.objectContaining({ discountTax: 20 }),
                        expect.objectContaining({ discountTax: 40 })
                    ])
                );
            });
    }, 10000);

    // FIND ONE

    test("Test get one category /category/:name", () => {
        // sintaxis alternativa con supertest
        // Uso la de jest con codigo asincrono con promesas
        return request(app)
            .get('/category/classic')
            .then(res => {
                // Received: "application/json; charset=utf-8"
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('_id', 'name', 'discountTax');
                expect(res.body).not.toHaveProperty('id', 'price');
                expect(res.body._id).not.toBeNull();
                expect(res.body._id).toBe('61b0f62a88d0be4b41bc1003');
                expect(res.body.name).toEqual(expect.stringMatching('classic'));
                expect(res.body.discountTax).toBe(40);
                expect(res.body.discountTax).not.toBeFalsy();
            });
    }, 10000);

    // DELETE

    test("Test delete category /category/delete/:name", () => {
        let name = 'classic';
        return request(app)
            .get(`/category/delete/${name}`)
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveProperty('_id', 'name', 'discountTax');
                expect(res.body._id).toBe('61b0f62a88d0be4b41bc1003');
                expect(res.body.name).toEqual(expect.stringMatching('classic'));
                expect(res.body.discountTax).toBe(40);
            });
    }, 10000);

    test("Test category has been deleted succesfully", () => {
        return request(app)
            .get('/category')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toBe(2);
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        // Ids
                        expect.objectContaining({ _id: '61b0f513646886f408bd0730' }),
                        expect.objectContaining({ _id: '61b0f513646886f408bd0731' }),
                        // Names category
                        expect.objectContaining({ name: 'common' }),
                        expect.objectContaining({ name: 'premium' }),
                        // DiscountTax Categories
                        expect.objectContaining({ discountTax: 60 }),
                        expect.objectContaining({ discountTax: 20 }),
                    ])
                );
                expect(res.body).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ _id: '61b0f62a88d0be4b41bc1003' }),
                        expect.objectContaining({ name: 'classic' }),
                        expect.objectContaining({ discountTax: 40 })
                    ]));
            });
    }, 10000);

    // CREATE 

    test("Test create category /category/create/:name/:discountTax", () => {
        let name = 'classic';
        let discountTax = 30;
        return request(app)
            .get(`/category/create/${name}/${discountTax}`)
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(201);
                expect(res.body).toHaveProperty('_id', 'name', 'discountTax');
                expect(res.body.name).toEqual(expect.stringMatching('classic'));
                expect(res.body.discountTax).toBe(30);
            });
    }, 10000);

    test("Test check category has been created /category", () => {
        return request(app)
            .get('/category')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toBe(3);
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        // Names category
                        expect.objectContaining({ name: 'classic' }),
                        expect.objectContaining({ name: 'common' }),
                        expect.objectContaining({ name: 'premium' }),
                        // DiscountTax Categories
                        expect.objectContaining({ discountTax: 60 }),
                        expect.objectContaining({ discountTax: 20 }),
                        expect.objectContaining({ discountTax: 30 })
                    ])
                );
            });
            });
    }, 10000);

    //! Falta testear 
    /**
     * Que no se puede crear una categoría ya existente
     * Que la categoría creada no coincide con el Modelo
     * Que no se puede eliminar una categoria no existente
     */