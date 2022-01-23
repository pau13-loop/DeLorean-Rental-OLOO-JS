var mongoose = require('mongoose');
const Category = require("./category");
var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
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
        ref: Category
    },
    year: {
        type: Number, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    //! Añadir no modificable
    ORIGINAL_PRICE: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
});

VehicleSchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id model brand category year price ORIGINAL_PRICE isAvailable');
});

module.exports = mongoose.model('vehicles', VehicleSchema);