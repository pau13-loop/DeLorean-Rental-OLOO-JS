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
        type: String,
        required: true
    },
    dniNumber: {
        type: Number,
        required: true
    },
    dniLetter: {
        type: String,
        required: true,
        minlength: 1,
        maxLength: 1
    }
});

// Pre hook for `findOneAndUpdate`
//* Source: https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update/53856167
CustomerSchema.pre(['findOneAndUpdate', 'findByIdAndUpdate'], function (next) {
    this.options.runValidators = true;
    next();
});

CustomerSchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate', 'findByIdAndUpdate'], function () {
    this.select('_id name lastName birthDate dniNumber dniLetter');
});

module.exports = mongoose.model('customers', CustomerSchema);