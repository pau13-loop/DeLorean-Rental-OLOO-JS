var mongoose = require('mongoose');
const Customer = require("./customer");
const Vehicle = require('./vehicle');
var Schema = mongoose.Schema;

var RentalSchema = new Schema({
    startDate: { 
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: Customer,
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: Vehicle
    }
});

RentalSchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id startDate endDate customer vehicle');
});

module.exports = mongoose.model('rentals', RentalSchema);