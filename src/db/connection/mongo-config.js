
var mongoose = require('mongoose');
require('dotenv').config();

//* Source: https://github.com/dfleta/pushmees_pullmees/blob/master/db/mongoConfig.js

var databaseUri = {
    
    production: process.env.ATLAS_PRODUCTION,

    development: process.env.ATLAS_DEVELOPMENT,
    
    test: process.env.ATLAS_TEST 
}

module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(databaseUri[process.env.NODE_ENV], { useNewUrlParser: true , useUnifiedTopology: true});
    },
    disconnect: done => {
        mongoose.disconnect(done);
    }
};