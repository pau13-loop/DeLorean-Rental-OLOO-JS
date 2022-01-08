var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
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
    this.select('_id name birthDate dniNumber dniLetter');
});

module.exports = mongoose.model('customers', CustomerSchema);