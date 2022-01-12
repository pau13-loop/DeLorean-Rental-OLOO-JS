const { MongoClient } = require("mongodb");
require('dotenv').config();

//* COLLECTIONS *//
const vehicleCollection = require('../collections/vehicleCollectionShortList');
const categoryCollection = require('../collections/categoryCollection');
const customersCollection = require("../collections/customersCollection");
const bookingsCollection = require("../collections/bookingsCollection");

//* URI *//
const uri =
    `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@proyectodual.4q26o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        //! Cambiado para poder hace llamadas con Hoppscotch
        const database = client.db('Rent-a-car_test');
        // const database = client.db('Rent-a-car');
        const categories = database.collection('categories');
        const customers = database.collection('customers')
        const vehicles = database.collection('vehicles');
        const bookings = database.collection("bookings");

        let numCategoriesDocs = await categories.estimatedDocumentCount();
        if (numCategoriesDocs > 0) {
            await categories.drop().then((successMessage) => {
                console.log(`Droped categories ${successMessage}`);
            });
        }

        let numCustomersDocs = await customers.estimatedDocumentCount();
        if (numCustomersDocs > 0) {
            await customers.drop().then((successMessage) => {
                console.log(`Droped customers ${successMessage}`)
            })
        }

        let numVehiclesDocs = await vehicles.estimatedDocumentCount();
        if (numVehiclesDocs > 0) {
            await vehicles.drop().then((successMessage) => {
                console.log(`Droped vehicles ${successMessage}`);
            });
        }

        let numBookingsDocs = await bookings.estimatedDocumentCount();
        if (numBookingsDocs > 0) {
            await bookings.drop().then((successMessage) => {
                console.log(`Droped bookings ${successMessage}`);
            });
        }

        let result = await categories.insertMany(categoryCollection);
        console.log(`${result.insertedCount} == 3 categories inserted into DB`);
        result = await customers.insertMany(customersCollection);
        console.log(`${result.insertedCount} == 5 customers inserted into DB`);
        result = await vehicles.insertMany(vehicleCollection);
        console.log(`${result.insertedCount} == 10 vehicles inserted into DB`);
        result = await bookings.insertMany(bookingsCollection);
        console.log(`${result.insertedCount} == 4 bookings inserted into DB`);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);