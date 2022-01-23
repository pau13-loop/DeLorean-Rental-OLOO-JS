const ObjectId = require('mongodb').ObjectId;

// CATEGORIES NUMBER --> 3

module.exports = [
    //TODO: Add ObjectId
    {
        _id: ObjectId("61b0f513646886f408bd0730"),
        name: "common",
        discountTax: 60,
        MIN_PRICE_CATEGORY: 15
    },
    {
        _id: ObjectId("61b0f62a88d0be4b41bc1003"),
        name: "classic",
        discountTax: 40,
        MIN_PRICE_CATEGORY: 20
    },
    {
        _id: ObjectId("61b0f513646886f408bd0731"),
        name: "premium",
        discountTax: 20,
        MIN_PRICE_CATEGORY: 25
    }
];