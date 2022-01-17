const ObjectId = require('mongodb').ObjectId;

// BOOKINGS NUMBER --> 4

module.exports = [
    {
        _id: ObjectId("61d9da9122e2b4614b1c7afb"),
        startDate: '2020/02/22',
        endDate: '2020/02/29',
        customer: ObjectId("61d9cfbbd1b9a9480b0c343e"), // McFly
        vehicle: ObjectId("61d9d41e563bce29bd5181c2")   // DeLorean
    },
    {
        _id: ObjectId("61d9da984292aa2f665d71d7"),
        startDate: '2021/07/02',
        endDate: '2020/08/02',
        customer: ObjectId("61d9d064930c2597348b8a75"), // Baby
        vehicle: ObjectId("61d9d42831baf5c7f0104c94")   // Bumblebee
    },
    {
        _id: ObjectId("61d9da9c8886061930a91e2d"),
        startDate: '2020/11/20',
        endDate: '2020/11/24',
        customer: ObjectId("61d9d05197c1997053d02eae"), // Nicky Lauda
        vehicle: ObjectId("61d9d4165ccb5e87237f1de1")   // Model S
    },
    {
        _id: ObjectId("61d9da9f7c664f0817d33034"),
        startDate: '2022/01/04',
        endDate: '2022/01/08',
        customer: ObjectId("61d9d05c823d65cd8ca11194"), // Travis Bickle
        vehicle: ObjectId("61d9d42d2338c9151f929b57")   // Batmobile
        
    }
];