var mongoose = require('mongoose');
const Customer = require("./customer");
const Vehicle = require('./vehicle');
var Schema = mongoose.Schema;

var BookingSchema = new Schema({
    startDate: { 
        type: String,
        required: true
    },
    endDate: {
        type: String,
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

BookingSchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id startDate endDate customer vehicle');
});

module.exports = mongoose.model('bookings', BookingSchema);