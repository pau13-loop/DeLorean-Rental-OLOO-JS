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
        required: true,
        default: false
    }
});

VehicleSchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id model brand category passengers year price available');
});


module.exports = mongoose.model('vehicles', VehicleSchema);