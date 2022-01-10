const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const db = require('../db/connection/mongoConfig');

describe("Customer Routes", () => {

    beforeAll(async () => {
        await db.connect()
    });

    afterAll(async () => {
        await db.disconnect()
    });

    // FIND ALL

    test("Test get all customers /customer", () => {
        return request(app)
            .get('/customer')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.length).toBe(5);
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        // Ids
                        expect.objectContaining({ id: '61d9cfbbd1b9a9480b0c343e' }),
                        expect.objectContaining({ id: '61d9d05197c1997053d02eae' }),
                        expect.objectContaining({ id: '61d9d058473978e11f845d5e' }),
                        expect.objectContaining({ id: '61d9d05c823d65cd8ca11194' }),
                        expect.objectContaining({ id: '61d9d064930c2597348b8a75' }),
                        // Names customers
                        expect.objectContaining({ name: 'Marty' }),
                        expect.objectContaining({ name: 'Niki' }),
                        expect.objectContaining({ name: 'Lewis' }),
                        expect.objectContaining({ name: 'Travis' }),
                        expect.objectContaining({ name: 'Baby' }),
                    ])
                );
            });
    }, 100000);

    // FIND ONE BY NAME

    test("Test get one customer by name /customer/:key/:value", () => {
        let nameCustomer = 'Marty';
        return request(app)
            .get(`/customer/name/${nameCustomer}`)
            .then(res => {
                // Received: "application/json; charset=utf-8"
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data).toHaveProperty('id', 'name', 'lastName', 'birthDate', 'dniNumber', 'dniLetter');
                expect(res.body.data).not.toHaveProperty('_id', 'fullName');
                expect(res.body.data.id).not.toBeNull();
                expect(res.body.data.id).toBe('61d9cfbbd1b9a9480b0c343e');
                expect(res.body.data.name).toEqual(expect.stringMatching('Marty'));
                expect(res.body.data.lastName).toEqual(expect.stringMatching('McFly'));
                expect(res.body.data.birthDate).toBe("1968-06-11T23:00:00.000Z");
                expect(res.body.data.dniNumber).toEqual(17608824);
                expect(res.body.data.dniLetter).toBe("R");
            });
    }, 10000);

    // FIND ONE BY ID

    test("Test get one customer by id /customer/:key/:value", () => {
        let idCustomer = '61d9d064930c2597348b8a75';
        return request(app)
            .get(`/customer/id/${idCustomer}`)
            .then(res => {
                // Received: "application/json; charset=utf-8"
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data).toHaveProperty('id', 'name', 'lastName', 'birthDate', 'dniNumber', 'dniLetter');
                expect(res.body.data).not.toHaveProperty('_id', 'fullName');
                expect(res.body.data.id).not.toBeNull();
                expect(res.body.data.id).toBe('61d9d064930c2597348b8a75');
                expect(res.body.data.name).toEqual(expect.stringMatching('Baby'));
                expect(res.body.data.lastName).toBeUndefined();
                expect(res.body.data.birthDate).toBe("1994-03-13T23:00:00.000Z");
                expect(res.body.data.dniNumber).toEqual(63453896);
                expect(res.body.data.dniLetter).toBe("R");
            });
    }, 10000);

    // DELETE BY NAME

    test("Test delete customer by name /customer/delete/:key/:value", () => {
        let name = 'Marty';
        return request(app)
            .delete(`/customer/delete/name/${name}`)
            .then(res => {
                // No content, status code 204
                // expect(res.get('Content-Type')).toEqual(expect.stringMatching('text/html; charset=utf-8'));
                expect(res.statusCode).toEqual(204);
                expect(res.body.data).toBeUndefined();
                expect(res.body.data).toBeFalsy();
            });
    }, 10000);

        test("Test customer by name has been deleted succesfully by name", () => {
        return request(app)
            .get('/customer')
            .then(res => {
                expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.length).toBe(4);
                expect(res.body.data).toEqual(
                    expect.arrayContaining([
                        // Ids
                        expect.objectContaining({ id: '61d9d05197c1997053d02eae' }),
                        expect.objectContaining({ id: '61d9d058473978e11f845d5e' }),
                        expect.objectContaining({ id: '61d9d05c823d65cd8ca11194' }),
                        expect.objectContaining({ id: '61d9d064930c2597348b8a75' }),
                        // Names customers
                        expect.objectContaining({ name: 'Niki' }),
                        expect.objectContaining({ name: 'Lewis' }),
                        expect.objectContaining({ name: 'Travis' }),
                        expect.objectContaining({ name: 'Baby' })
                    ])
                );
                expect(res.body.data).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining({ id: '61d9cfbbd1b9a9480b0c343e' }),
                        expect.objectContaining({ name: 'Marty' }),
                        expect.objectContaining({ lastName: 'McFly' }),
                        expect.objectContaining({ birthDate: '1968-06-11T23:00:00.000Z' }),
                        expect.objectContaining({ dniNumber: 17608824 }),
                        expect.objectContaining({ dniLetter: 'R' }),
                    ]));
            });
        }, 10000);

        // DELETE BY ID

        test("Test delete customer by id /customer/delete/:key/:value", () => {
            let idCustomer = '61d9d05197c1997053d02eae';
            return request(app)
                .delete(`/customer/delete/id/${idCustomer}`)
                .then(res => {
                    // No content, status code 204
                    // expect(res.get('Content-Type')).toEqual(expect.stringMatching('text/html; charset=utf-8'));
                    expect(res.statusCode).toEqual(204);
                    expect(res.body.data).toBeUndefined();
                    expect(res.body.data).toBeFalsy();
                });
        }, 10000);

        test("Test customer by id has been deleted succesfully by id", () => {
            return request(app)
                .get('/customer')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(3);
                    expect(res.body.data).toEqual(
                        expect.arrayContaining([
                            // Ids
                            expect.objectContaining({ id: '61d9d058473978e11f845d5e' }),
                            expect.objectContaining({ id: '61d9d05c823d65cd8ca11194' }),
                            expect.objectContaining({ id: '61d9d064930c2597348b8a75' }),
                            // Names customers
                            expect.objectContaining({ name: 'Lewis' }),
                            expect.objectContaining({ name: 'Travis' }),
                            expect.objectContaining({ name: 'Baby' })
                        ])
                    );
                    expect(res.body.data).toEqual(
                        expect.not.arrayContaining([
                            expect.objectContaining({ id: '61d9d05197c1997053d02eae' }),
                            expect.objectContaining({ name: 'Niki' }),
                            expect.objectContaining({ lastName: 'Lauda' }),
                            expect.objectContaining({ birthDate: '1949-02-21T23:00:00.000Z'}),
                            expect.objectContaining({ dniNumber: 32361387 }),
                            expect.objectContaining({ dniLetter: 'L' }),
                        ]));
                });
            }, 10000);
}, 10000);