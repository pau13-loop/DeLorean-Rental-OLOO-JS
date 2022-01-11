const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const db = require('../db/connection/mongoConfig');

describe("Category Routes", () => {

    beforeAll(async () => {
        await db.connect()
    });

    afterAll(async () => {
        await db.disconnect()
    });

    //FIND ALL

    test("Test get all categories /category", () => {
        return request(app)
            .get('/category')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.length).toBe(3);
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        // Ids
                        expect.objectContaining({ id: '61b0f513646886f408bd0730' }),
                        expect.objectContaining({ id: '61b0f513646886f408bd0731' }),
                        expect.objectContaining({ id: '61b0f62a88d0be4b41bc1003' }),
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
    }, 100000);

    // FIND ONE BY NAME

    test("Test get one category by name /category/:key/:value", () => {
        return request(app)
            .get('/category/name/classic')
            .then(res => {
                // Received: "application/json; charset=utf-8"
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data).toHaveProperty('id', 'name', 'discountTax');
                expect(res.body.data).not.toHaveProperty('_id', 'price');
                expect(res.body.data.id).not.toBeNull();
                expect(res.body.data.id).toBe('61b0f62a88d0be4b41bc1003');
                expect(res.body.data.name).toEqual(expect.stringMatching('classic'));
                expect(res.body.data.discountTax).toBe(40);
                expect(res.body.data.discountTax).not.toBeFalsy();
            });
    }, 10000);

    // FIND ONE BY ID

    test("Test get one category by id /category/:key/:value", () => {
        let categoryId = "61b0f513646886f408bd0731";
        return request(app)
            .get(`/category/id/${categoryId}`)
            .then(res => {
                // Received: "application/json; charset=utf-8"
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data).toHaveProperty('id', 'name', 'discountTax');
                expect(res.body.data).not.toHaveProperty('_id', 'price');
                expect(res.body.data.id).not.toBeNull();
                expect(res.body.data.id).toBe('61b0f513646886f408bd0731');
                expect(res.body.data.name).toEqual(expect.stringMatching('premium'));
                expect(res.body.data.discountTax).toBe(20);
                expect(res.body.data.discountTax).not.toBeFalsy();
            });
    }, 10000);

    // DELETE BY NAME

    test("Test delete category by name /category/delete/:key/:value", () => {
        let name = 'classic';
        return request(app)
            .delete(`/category/delete/name/${name}`)
            .then(res => {
                // No content, status code 204
                // expect(res.get('Content-Type')).toEqual(expect.stringMatching('text/html; charset=utf-8'));
                expect(res.statusCode).toEqual(204);
                expect(res.body.data).toBeUndefined();
                expect(res.body.data).toBeFalsy();
            });
    }, 10000);

    test("Test category by name has been deleted succesfully", () => {
        return request(app)
            .get('/category')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.length).toBe(2);
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        // Ids
                        expect.objectContaining({ id: '61b0f513646886f408bd0730' }),
                        expect.objectContaining({ id: '61b0f513646886f408bd0731' }),
                        // Names category
                        expect.objectContaining({ name: 'common' }),
                        expect.objectContaining({ name: 'premium' }),
                        // DiscountTax Categories
                        expect.objectContaining({ discountTax: 60 }),
                        expect.objectContaining({ discountTax: 20 }),
                    ])
                );
                expect(res.body.data).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id: '61b0f62a88d0be4b41bc1003' }),
                        expect.objectContaining({ name: 'classic' }),
                        expect.objectContaining({ discountTax: 40 })
                    ]));
            });
    }, 10000);

    // DELETE BY ID

    test("Test delete category by id /category/delete/:key/:value", () => {
        let categoryId = '61b0f513646886f408bd0731';    // premium
        return request(app)
            .delete(`/category/delete/id/${categoryId}`)
            .then(res => {
                // No content, status code 204
                // expect(res.get('Content-Type')).toEqual(expect.stringMatching('text/html; charset=utf-8'));
                expect(res.statusCode).toEqual(204);
                expect(res.body.data).toBeUndefined();
                expect(res.body.data).toBeFalsy();
            });
    }, 10000);

    test("Test category by id has been deleted succesfully", () => {
        return request(app)
            .get('/category')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.length).toBe(1);
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        // Ids
                        expect.objectContaining({ id: '61b0f513646886f408bd0730' }),
                        // Names category
                        expect.objectContaining({ name: 'common' }),
                        // DiscountTax Categories
                        expect.objectContaining({ discountTax: 60 })
                    ])
                );
                expect(res.body.data).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id: '61b0f513646886f408bd0731' }),
                        expect.objectContaining({ name: 'premium' }),
                        expect.objectContaining({ discountTax: 20 })
                    ]));
            });
    }, 10000);

    // CREATE 

    test("Test create category /category/create", () => {
        return request(app)
            .post('/category/create')
            .send({'name': 'classic', 'discountTax': 30})
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(202);
                expect(res.body.data).toHaveProperty('id', 'name', 'discountTax');
                expect(res.body.data.name).toEqual(expect.stringMatching('classic'));
                expect(res.body.data.discountTax).toBe(30);
            });
    }, 10000);

    test("Test check category has been created /category", () => {
        return request(app)
            .get('/category')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.length).toBe(2);
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        // Names category
                        expect.objectContaining({ name: 'classic' }),
                        expect.objectContaining({ name: 'common' }),
                        // DiscountTax Categories
                        expect.objectContaining({ discountTax: 60 }),
                        expect.objectContaining({ discountTax: 30 })
                    ])
                );
            });
    }, 10000);
    // http://localhost:3000/category/update/premium/50
    test("Test update discountTax category /category/update/:name/:value", () => {
        let nameCategoryToUpdate = 'classic';
        let newDiscountTax = 80;
        return request(app)
            .put(`/category/update/${nameCategoryToUpdate}/${newDiscountTax}`)
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(202);
                expect(res.body.data).toHaveProperty('id', 'name', 'discountTax');
                expect(res.body.data.name).toEqual(expect.stringMatching('classic'));
                expect(res.body.data.discountTax).toBe(80);
            });
    }, 10000);
}, 10000);

    //! Falta testear 
/**
 * Que no se puede crear una categoría ya existente
 * Que la categoría creada no coincide con el Modelo
 * Que no se puede eliminar una categoria no existente
 */