const ObjectId = require('mongodb').ObjectId;

// CUSTOMERS NUMBER --> 6

module.exports = [
    {
        _id: ObjectId("61d9cfbbd1b9a9480b0c343e"),
        name: 'Marty',
        lastName: 'McFly',
        birthDate: '1968/06/12',
        dniNumber: 17608824,
        dniLetter: 'R',
    },
    {
        _id: ObjectId("61d9d05197c1997053d02eae"),
        name: 'Niki',
        lastName: 'Lauda',
        birthDate: '1949/02/22',
        dniNumber: 32361387,
        dniLetter: 'L',
    },
    {
        _id: ObjectId("61d9d058473978e11f845d5e"),
        name: 'Lewis',
        lastName: 'Hamilton',
        birthDate: '1985/01/07',
        dniNumber: 45462541,
        dniLetter: 'M',
    },
    {
        _id: ObjectId("61d9d05c823d65cd8ca11194"),
        name: 'Travis',
        lastName: 'Bickle',
        birthDate: '1976/05/13',
        dniNumber: 68096750,
        dniLetter: 'Y',
    },
    {
        _id: ObjectId("61d9d064930c2597348b8a75"),
        name: 'Baby',
        birthDate: '1994/03/14',
        dniNumber: 63453896,
        dniLetter: 'R',
    },
    // Under age customer --> from UP movie
    {
        _id: '61e46e081ef770a3a24e77de',
        name: 'Carl',
        lastName: 'Fredricksen',
        birthDate: '2009/07/30',
        dniNumber: 25668350,
        dniLetter: 'M'
    }
];