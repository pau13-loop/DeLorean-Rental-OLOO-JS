/**
 * Ejecutar en terminal:
 * $ node ./db/isAtlasAlive.js
 * 
 * Deben observarse las dos queries
 */

const { MongoClient } = require("mongodb");

const uri =
    `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@proyectodual.4q26o.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('Rent-a-car_test');
        const categories = database.collection('categories');
        const customers = database.collection('customers');
        const vehicles = database.collection('vehicles');

        const queryCategory = {
            'name': 'classic'
        };
        const queryVehicle = {
            'model': 'DeLorean'
        };
        const queryCustomer = {
            'name': 'Marty McFly'
        }
        const category = await categories.findOne(queryCategory);
        const vehicle = await vehicles.findOne(queryVehicle);
        const customer = await customers.findOne(queryCustomer);

        console.log("I still alive!!")
        console.log(JSON.stringify(category, null, 2));
        console.log(JSON.stringify(customer, null, 2));
        console.log(JSON.stringify(vehicle, null, 2));

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);