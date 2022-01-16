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
    this.select('_id model brand category passengers year price isAvailable');
});

module.exports = mongoose.model('vehicles', VehicleSchema);