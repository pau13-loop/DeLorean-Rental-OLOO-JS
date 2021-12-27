
var mongoose = require('mongoose');

/**
 * NODE_ENV=development
 * NODE_ENV=production
 * NODE_ENV=test
 */
var databaseUri = {
    
    production: `mongodb+srv://admin:admin@proyectodual.4q26o.mongodb.net/Rent-a-car?retryWrites=true&w=majority`,

    development: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@proyectodual.4q26o.mongodb.net/Rent-a-car?retryWrites=true&w=majority`,
    // ojo al nombre pushmees_pullmeSs_test
    
    test: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@proyectodual.4q26o.mongodb.net/Rent-a-car?retryWrites=true&w=majority`
}

module.exports = {
    mongoose,   // usado por app()
    connect: () => {
        // connect es usado por app()
        // connect devuelve una promesa, es asincrono
        mongoose.Promise = Promise;
        mongoose.connect(databaseUri.production, { useNewUrlParser: true , useUnifiedTopology: true});
    },
    disconnect: done => {
        // done es una variable que indica
        // que una operacion async esta terminada
        // disconnect es usado en beforeAll en Jest
        mongoose.disconnect(done);
    }
};