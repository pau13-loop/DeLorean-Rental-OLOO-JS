var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        enum: ['common', 'classic', 'premium'],
        required: true
    },
    discountTax: {
        type: Number,
        min: 10, 
        max: 80,
        required: true
    },
    MIN_PRICE_CATEGORY: {
        type: Number,
        required: true,
        min: 10
    }
});

//* Source: https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update/53856167
CategorySchema.pre(['findOneAndUpdate', 'findByIdAndUpdate'], function (next) {
    this.options.runValidators = true;
    next();
});

CategorySchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id name discountTax MIN_PRICE_CATEGORY');
});

module.exports = mongoose.model('categories', CategorySchema);