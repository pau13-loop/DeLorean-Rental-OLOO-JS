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
    //! convertirlo en constante ?
    //! en el modelo también se seteará desde el primer momento ?
    //* passengers se puede eliminar, no se utiliza para nada de momento
    // originalPrice: {
    //     type: Number,
    //     required: false
    // },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
});

VehicleSchema.pre(['find', 'findOne', 'findOneAndDelete', 'findOneAndUpdate'], function () {
    this.select('_id model brand category passengers year price available');
});


module.exports = mongoose.model('vehicles', VehicleSchema);