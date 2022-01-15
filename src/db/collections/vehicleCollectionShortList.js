const ObjectId = require('mongodb').ObjectId;

module.exports = [
    // 4 Common - 2 repeated
    {
        _id: ObjectId("61d9d405e27e034e2e2d52e1"),
        model: "Clio",
        brand: "renault",
        category: ObjectId("61b0f513646886f408bd0730"),
        passengers: 5,
        year: 2018,
        price: 10,
        available: true,
    },
    {
        _id: ObjectId("61da25c0bcbf3e5cd7af6655"),
        model: "Clio",
        brand: "renault",
        category: ObjectId("61b0f513646886f408bd0730"),
        passengers: 5,
        year: 2018,
        price: 10,
        available: false,
    },
    {
        _id: ObjectId("61d9d40de380c7e6a6974668") ,
        model: "Golf",
        brand: "volkswagen",
        category: ObjectId("61b0f513646886f408bd0730"),
        passengers: 5,
        year: 2019,
        price: 13,
        available: true
    },
    {
        _id: ObjectId("61da25cab859aa8fe6b1b915") ,
        model: "Golf",
        brand: "volkswagen",
        category: ObjectId("61b0f513646886f408bd0730"),
        passengers: 5,
        year: 2019,
        price: 13,
        available: true
    },
    // 2 Premium
    {
        _id: ObjectId("61d9d411abda96e0e0e59319"),
        model: "Tycan Turbo",
        brand: "prosche",
        category: ObjectId("61b0f513646886f408bd0731"),
        passengers: 5,
        year: 2020,
        price: 30,
        available: true
    },
    {
        _id: ObjectId("61d9d4165ccb5e87237f1de1"),
        model: "Model S",
        brand: "Tesla",
        category: ObjectId("61b0f513646886f408bd0731"),
        passengers: 5,
        year: 2021,
        price: 25,
        available: true
    },
    // 4 Classic
    {
        _id: ObjectId("61d9d41e563bce29bd5181c2"),
        model: "DeLorean",
        brand: "Motor Company",
        category: ObjectId("61b0f62a88d0be4b41bc1003"),
        passengers: 4,
        year: 1983,
        price: 35,
        available: true
    },
    {
        _id: ObjectId("61d9d42295bf779ca13223ac"),
        model: "Herbie Torero",
        brand: "Volkswagen",
        category: ObjectId("61b0f62a88d0be4b41bc1003"),
        passengers: 5,
        year: 1980,
        price: 25,
        available: true
    },
    {
        id: ObjectId("61d9d42831baf5c7f0104c94"),
        model: "Bumblebee",
        brand: "Chevrolet",
        category: ObjectId("61b0f62a88d0be4b41bc1003"),
        passengers: 5,
        year: 2007,
        price: 30,
        availalbe: true
    },
    {
        id: ObjectId("61d9d42d2338c9151f929b57"),
        model: "Batmobile",
        brand: "Lincoln Futura",
        category: ObjectId("61b0f62a88d0be4b41bc1003"),
        passengers: 2,
        year: 1943,
        price: 45,
        available: true
    }
];