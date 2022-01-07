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
        const vehicles = database.collection('vehicles');
        const categories = database.collection('categories');

        // Query of vehicles category
        const query = {
            'name': 'category vehicles'
        }
        const category = await categories.findOne(query);
        // Query of vehicles
        const vehicle = await vehicles.findOne();

        console.log("I still alive!!")
        console.log(JSON.stringify(category, null, 2));
        console.log(JSON.stringify(vehicle, null, 2));

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);