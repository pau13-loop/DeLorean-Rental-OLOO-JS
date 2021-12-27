var mongoose = require('mongoose');
const Category = require("./category");

var Schema = mongoose.Schema;

var VehicleModelSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId, 
        enum: ['premium', 'common', 'classic'],
        ref: Category.name
    },
    passengers: {
        type: Number, 
        required: true
    },
    year: {
        type: Number, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('VehicleModel', VehicleModelSchema);