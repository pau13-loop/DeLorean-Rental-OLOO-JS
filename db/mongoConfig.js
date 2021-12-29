
var mongoose = require('mongoose');
require('dotenv').config();

var databaseUri = {
    
    production: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@proyectodual.4q26o.mongodb.net/Rent-a-car?retryWrites=true&w=majority`,

    development: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@proyectodual.4q26o.mongodb.net/Rent-a-car?retryWrites=true&w=majority`,
    
    test: `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@proyectodual.4q26o.mongodb.net/Rent-a-car_test?retryWrites=true&w=majority`
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