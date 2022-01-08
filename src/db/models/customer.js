var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: true
    },
    dniNumber: {
        type: Number,
        required: true
    },
    dniLetter: {
        type: String,
        required: true
    }
});

CustomerSchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id name lastName birthDate dniNumber dniLetter');
});

module.exports = mongoose.model('customers', CustomerSchema);