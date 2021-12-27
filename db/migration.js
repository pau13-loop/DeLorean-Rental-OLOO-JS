const { MongoClient } = require("mongodb");

//* COLLECTIONS *//
const vehicleCollection = require('./collections/vehicleCollection');
const categoryCollection = require('./collections/categoryCollection');

//* URI *//
const uri =
    `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0-ud3ms.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('Rent-a-car');
        const vehicles = database.collection('vehicles');
        const categories = database.collection('categories');

        let numVehiclesDocs = await vehicles1.estimatedDocumentCount();
        if (numVehiclesDocs > 0) {
            await vehicles.drop().then((successMessage) => {
                console.log("Droped vehicles " + successMessage);
            });
        }

        let numCategoriesDocs = await categories.estimatedDocumentCount();
        if (numCategoriesDocs > 0) {
            await categories.drop().then((successMessage) => {
                console.log("Droped categories " + successMessage);
            });
        }

        let result = await categories.insertMany(categoryCollection);
        console.log(`${result.insertedCount} == 3 categories inserted into DB`);

        result = await vehicles.insertMany(vehicleCollection);
        console.log(`${result.insertedCount} == 30 vehicles inserted into DB`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);