const { MongoClient } = require("mongodb");

//* COLLECTIONS *//
const vehicleCollection = require('./collections/vehicleCollection');
const categoryCollection = require('./collections/categoryCollection');

//* URI *//
const uri =
    `mongodb+srv://admin:admin@proyectodual.4q26o.mongodb.net/Rent-a-car?retryWrites=true&w=majority`

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const database = client.db('Rent-a-car');
        const vehicles = database.collection('vehicles');
        const categories = database.collection('categories');

        let numVehiclesDocs = await vehicles.estimatedDocumentCount();
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
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);