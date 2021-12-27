var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryModelSchema = new Schema ({
    name: {
        type: String, 
        required: true
    },
    discountTax: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CategoryModel', CategoryModelSchema);