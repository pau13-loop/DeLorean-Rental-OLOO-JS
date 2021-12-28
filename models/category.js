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
    }
});

CategorySchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id name discountTax');
});


module.exports = mongoose.model('category', CategorySchema);