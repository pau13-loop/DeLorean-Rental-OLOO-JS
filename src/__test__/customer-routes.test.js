const { expect } = require('@jest/globals');
const request = require('supertest');
const app = require('../index');
const db = require('../db/connection/mongo-config');
const CustomerModel = require('../db/models/customer');
const customerCollection = require('../db/collections/customers-collection');

describe("Customer Routes", () => {

    beforeAll(async () => {
        await db.connect()
    });

    afterAll(async () => {
        await db.disconnect()
    });

    describe("Customer FIND test cases", () => {
        beforeAll(async () => {
            await CustomerModel.insertMany(customerCollection);
        }, 10000);

        afterAll(async () => {
            await CustomerModel.deleteMany();
        }, 10000);

        // FIND ALL

        test("Test get all customers /customer", () => {
            return request(app)
                .get('/customer')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(6);
                    expect(res.body.data).toEqual(
                        expect.arrayContaining([
                            // Ids
                            expect.objectContaining({ id: '61d9cfbbd1b9a9480b0c343e' }),
                            expect.objectContaining({ id: '61d9d05197c1997053d02eae' }),
                            expect.objectContaining({ id: '61d9d058473978e11f845d5e' }),
                            expect.objectContaining({ id: '61d9d05c823d65cd8ca11194' }),
                            expect.objectContaining({ id: '61d9d064930c2597348b8a75' }),
                            expect.objectContaining({ id: '61e46e081ef770a3a24e77de' }),
                            // Names customers
                            expect.objectContaining({ name: 'Marty' }),
                            expect.objectContaining({ name: 'Niki' }),
                            expect.objectContaining({ name: 'Lewis' }),
                            expect.objectContaining({ name: 'Travis' }),
                            expect.objectContaining({ name: 'Baby' }),
                            expect.objectContaining({ name: 'Carl' })
                        ])
                    );
                });
        }, 10000);

        // FIND ONE BY NAME

        test("Test get one customer by name /customer/:key/:value", () => {
            let nameCustomer = 'Marty';
            return request(app)
                .get(`/customer/name/${nameCustomer}`)
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'name', 'lastName', 'birthDate', 'dniNumber', 'dniLetter');
                    expect(res.body.data).not.toHaveProperty('_id', 'fullName');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.id).toBe('61d9cfbbd1b9a9480b0c343e');
                    expect(res.body.data.name).toEqual(expect.stringMatching('Marty'));
                    expect(res.body.data.lastName).toEqual(expect.stringMatching('McFly'));
                    expect(res.body.data.birthDate).toBe("Wednesday, Jun 12, 1968");
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
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data).toHaveProperty('id', 'name', 'lastName', 'birthDate', 'dniNumber', 'dniLetter');
                    expect(res.body.data).not.toHaveProperty('_id', 'fullName');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.id).toBe('61d9d064930c2597348b8a75');
                    expect(res.body.data.name).toEqual(expect.stringMatching('Baby'));
                    expect(res.body.data.lastName).toBeUndefined();
                    expect(res.body.data.birthDate).toBe("Monday, Mar 14, 1994");
                    expect(res.body.data.dniNumber).toEqual(63453896);
                    expect(res.body.data.dniLetter).toBe("R");
                });
        }, 10000);
    }, 10000);

    describe("Customer DELETE test cases", () => {
        beforeAll(async () => {
            await CustomerModel.insertMany(customerCollection);
        }, 10000);

        afterAll(async () => {
            await CustomerModel.deleteMany();
        }, 10000);

        // DELETE BY NAME

        test("Test delete customer by name /customer/delete/:key/:value", () => {
            let name = 'Marty';
            return request(app)
                .delete(`/customer/delete/name/${name}`)
                .then(res => {
                    // No content, status code 204
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
                    expect(res.body.data.length).toBe(5);
                    expect(res.body.data).toEqual(
                        expect.arrayContaining([
                            // Ids
                            expect.objectContaining({ id: '61d9d05197c1997053d02eae' }),
                            expect.objectContaining({ id: '61d9d058473978e11f845d5e' }),
                            expect.objectContaining({ id: '61d9d05c823d65cd8ca11194' }),
                            expect.objectContaining({ id: '61d9d064930c2597348b8a75' }),
                            expect.objectContaining({ id: '61e46e081ef770a3a24e77de' }),
                            // Names customers
                            expect.objectContaining({ name: 'Niki' }),
                            expect.objectContaining({ name: 'Lewis' }),
                            expect.objectContaining({ name: 'Travis' }),
                            expect.objectContaining({ name: 'Baby' }),
                            expect.objectContaining({ name: 'Carl' })
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
                    expect(res.body.data.length).toBe(4);
                    expect(res.body.data).toEqual(
                        expect.arrayContaining([
                            // Ids
                            expect.objectContaining({ id: '61d9d058473978e11f845d5e' }),
                            expect.objectContaining({ id: '61d9d05c823d65cd8ca11194' }),
                            expect.objectContaining({ id: '61d9d064930c2597348b8a75' }),
                            expect.objectContaining({ id: '61e46e081ef770a3a24e77de' }),
                            // Names customers
                            expect.objectContaining({ name: 'Lewis' }),
                            expect.objectContaining({ name: 'Travis' }),
                            expect.objectContaining({ name: 'Baby' }),
                            expect.objectContaining({ name: 'Carl' })
                        ])
                    );
                    expect(res.body.data).toEqual(
                        expect.not.arrayContaining([
                            expect.objectContaining({ id: '61d9d05197c1997053d02eae' }),
                            expect.objectContaining({ name: 'Niki' }),
                            expect.objectContaining({ lastName: 'Lauda' }),
                            expect.objectContaining({ birthDate: '1949-02-21T23:00:00.000Z' }),
                            expect.objectContaining({ dniNumber: 32361387 }),
                            expect.objectContaining({ dniLetter: 'L' }),
                        ]));
                });
        }, 10000);
    }, 10000);

    describe("Customer CREATE test cases", () => {
        beforeAll(async () => {
            await CustomerModel.insertMany(customerCollection);
        }, 10000);

        afterAll(async () => {
            await CustomerModel.deleteMany();
        }, 10000);

        // CREATE 

        test("Test create customer /category/customer", () => {
            return request(app)
                .post('/customer/create')
                .send({ "name": "Jeff", "lastName": "Ament", "birthDate": "1963/03/10", "dniNumber": 73194184, "dniLetter": "L" })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toHaveProperty('id', 'lastName', 'birthDate', 'dniNumber', 'dniLetter');
                    expect(res.body.data.name).toEqual(expect.stringMatching('Jeff'));
                    expect(res.body.data.lastName).toEqual(expect.stringMatching('Ament'));
                    expect(res.body.data.birthDate).toBe("Sunday, Mar 10, 1963");
                    expect(res.body.data.dniNumber).toEqual(73194184);
                    expect(res.body.data.dniLetter).toBe("L");
                });
        }, 10000);

        test("Test check customer has been created /customer", () => {
            return request(app)
                .get('/customer')
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(200);
                    expect(res.body.data.length).toBe(7);
                    expect(res.body.data).toEqual(
                        expect.arrayContaining([
                            // Names customers
                            expect.objectContaining({ name: 'Lewis' }),
                            expect.objectContaining({ name: 'Travis' }),
                            expect.objectContaining({ name: 'Baby' }),
                            expect.objectContaining({ name: 'Jeff' })
                        ])
                    );
                });
        }, 10000);

        // CREATE WITH WRONG DNI VALUE 

        test("Test create customer /category/customer", () => {
            return request(app)
                .post('/customer/create')
                .send({ "name": "Jeff", "lastName": "Ament", "birthDate": "1963/03/10", "dniNumber": 73194184, "dniLetter": "Y" })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toBeNull();
                    expect(res.body.message).toEqual(expect.stringMatching("Couldn\'t create customer please check the specified parameters"));
                });
        }, 10000);
    }, 10000);

    describe("Customer UPDATE test cases", () => {
        beforeAll(async () => {
            await CustomerModel.insertMany(customerCollection);
        }, 10000);

        afterAll(async () => {
            await CustomerModel.deleteMany();
        }, 10000);

        // UPDATE

        test("Test update customer /customer/update/:value", () => {
            let customerId = '61d9d05c823d65cd8ca11194';    // Travis
            return request(app)
                .put(`/customer/update/${customerId}`)
                .send({ "name": "User", "lastName": "Updated", "birthDate": "1968/06/20", "dniNumber": 54480059, "dniLetter": "M" })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toHaveProperty('id', 'name', 'lastName', 'birthDate', 'dniNumber', 'dniLetter');
                    expect(res.body.data.id).not.toBeNull();
                    expect(res.body.data.id).toBe('61d9d05c823d65cd8ca11194');
                    expect(res.body.data.name).toEqual(expect.stringMatching('User'));
                    expect(res.body.data.lastName).toEqual(expect.stringMatching('Updated'));
                    expect(res.body.data.birthDate).toBe("Thursday, Jun 20, 1968");
                    expect(res.body.data.dniNumber).toEqual(54480059);
                    expect(res.body.data.dniLetter).toBe("M");
                });
        }, 10000);

        // UPDATE WITH WRONG DNI NUMBER

        test("Test update customer /customer/update/:value", () => {
            let customerId = '61d9d05c823d65cd8ca11194';    // Travis
            return request(app)
                .put(`/customer/update/${customerId}`)
                .send({ "name": "User", "lastName": "Updated", "birthDate": "1968/06/20", "dniNumber": 54480009, "dniLetter": "M" })
                .then(res => {
                    expect(res.get('Content-Type')).toEqual(expect.stringMatching('/json'));
                    expect(res.statusCode).toEqual(202);
                    expect(res.body.data).toBeNull();
                    expect(res.body.message).toEqual(expect.stringMatching("Check the specified parameter please"));
                });
        }, 10000);
    }, 10000);
}, 10000);