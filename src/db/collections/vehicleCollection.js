//! COPIA OFICIAL DE LA BD

//* Último año disponible --> 2017 (para coches que no sean clásicos)

/**
 * CATEGORY
 * 
 * Common: 60
 * 
 * Classic: 40
 * 
 * Premium: 20
 */

/**
 ** Information about the mock
 * 30 cars listed 
 * 12 repeated
 * 18 unique
 * //////////////////
 * 5 renault
 * 5 volkswagen
 * 5 seat 
 * 5 ford
 * 5 toyota
 * 5 audi
 * 
 * //////////////////
 * 
 * 18 common
 * 
 * 6 classic
 * 
 * 6 premium
 * 
 */

module.exports = [
    // RENAULT
    {
        model: "clio",
        brand: "renault",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2018,
        price: 20,
        available: true,
    },
    {
        model: "clio",
        brand: "renault",
        category: {
            name: "premium",
            discountTax: 20
        },
        passengers: 5,
        year: 2018,
        price: 20,
        available: true,
    },
    {
        model: "megane",
        brand: "renault",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2020,
        price: 25,
        available: true,
    },
    {
        model: "4",
        brand: "renault",
        category: {
            name: "classic",
            discountTax: 40
        },
        passengers: 5,
        year: 1992,
        price: 30,
        available: true,
    },
    {
        model: "alpine",
        brand: "renault",
        category: {
            name: "premium",
            discountTax: 20
        },
        passengers: 4,
        year: 2021,
        price: 50,
        available: true,
    },
    // SEAT
    {
        model: "leon",
        brand: "seat",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2017,
        price: 20,
        available: true,
    },
    {
        model: "leon",
        brand: "seat",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2017,
        price: 20,
        available: true,
    },
    {
        model: "cordoba",
        brand: "seat",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2018,
        price: 15,
        available: true,
    },
    {
        model: "ibiza",
        brand: "seat",
        category: {
            name: "classic",
            discountTax: 40
        },
        passengers: 5,
        year: 1995,
        price: 25,
        available: true,
    },
    {
        model: "cupra",
        brand: "seat",
        category: {
            name: "premium",
            discountTax: 20
        },
        passengers: 5,
        year: 2021,
        price: 45,
        available: true,
    },
    // VOLKSWAGEN
    {
        model: "golf",
        brand: "volkswagen",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2018,
        price: 20,
        available: true,
    },
    {
        model: "golf",
        brand: "volkswagen",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2018,
        price: 20,
        available: true,
    },
    {
        model: "polo",
        brand: "volkswagen",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2017,
        price: 15,
        available: true,
    },
    {
        model: "beattle",
        brand: "volkswagen",
        category: {
            name: "classic",
            discountTax: 40
        },
        passengers: 5,
        year: 1990,
        price: 30,
        available: true,
    },
    {
        model: "sirocco",
        brand: "volkswagen",
        category: {
            name: "premium",
            discountTax: 20
        },
        passengers: 4,
        year: 2020,
        price: 30,
        available: true,
    },
    // FORD
    {
        model: "galaxy",
        brand: "ford",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 7,
        year: 2017,
        price: 25,
        available: true,
    },
    {
        model: "galaxy",
        brand: "ford",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 7,
        year: 2017,
        price: 25,
        available: true,
    },
    {
        model: "focus",
        brand: "ford",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 5,
        year: 2019,
        price: 15,
        available: true,
    },
    {
        model: "mustang",
        brand: "ford",
        category: {
            name: "classic",
            discountTax: 40
        },
        passengers: 5,
        year: 1998,
        price: 65,
        available: true,
    },
    {
        model: "explorer",
        brand: "ford",
        category: {
            name: "premium",
            discountTax: 20
        },
        passengers: 8,
        year: 2021,
        price: 50,
        available: true,
    },
    // TOYOTA
    {
        model: "yaris",
        brand: "toyota",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 6,
        year: 2020,
        price: 15,
        available: true,
    },
    {
        model: "yaris",
        brand: "toyota",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 6,
        year: 2020,
        price: 15,
        available: true,
    },
    {
        model: "chr",
        brand: "toyota",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 6,
        year: 2021,
        price: 25,
        available: true,
    },
    {
        model: "corolla",
        brand: "toyota",
        category: {
            name: "classic",
            discountTax: 40
        },
        passengers: 4,
        year: 1999,
        price: 30,
        available: true,
    },
    {
        model: "gr",
        brand: "toyota",
        category: {
            name: "premium",
            discountTax: 20
        },
        passengers: 4,
        year: 2018,
        price: 45,
        available: true,
    },

    // AUDI
    {
        model: "a3",
        brand: "audi",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 6,
        year: 2019,
        price: 30,
        available: true,
    },
    {
        model: "a3",
        brand: "audi",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 6,
        year: 2019,
        price: 30,
        available: true,
    },
    {
        model: "q5",
        brand: "audi",
        category: {
            name: "common",
            discountTax: 60
        },
        passengers: 6,
        year: 2018,
        price: 40,
        available: true,
    },
    {
        model: "tt",
        brand: "audi",
        category: {
            name: "classic",
            discountTax: 40
        },
        passengers: 3,
        year: 2000,
        price: 35,
        available: true,
    },
    {
        model: "r8",
        brand: "audi",
        category: {
            name: "premium",
            discountTax: 20
        },
        passengers: 2,
        year: 2020,
        price: 90,
        available: true,
    },
    // 
]
