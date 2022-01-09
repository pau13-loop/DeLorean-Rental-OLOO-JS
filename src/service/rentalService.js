const Rental = require('../db/models/rental');
const objectParsers = require('../utils/objectParsers');

const RentalServiceAPI = (function singletonCategoryService() {

    const getAllRentals = () => {
        return Rental.find().then(objectParsers.ObjectParsers.rentalDataParser);
    }

    const getOneRental = (key, value) => {
        return (key === 'id'
            ? Rental.findById(value)
            : Rental.findOne({ [key]: value }))
            .exec()
            .then(objectParsers.ObjectParsers.rentalDataParser);
    }

    const deleteRental = (key, value) => {
        return (key === 'id' 
            ? Rental.findByIdAndDelete(value)
            : Rental.findOneAndDelete({[key]: value}))
            .exec()
            .then(objectParsers.ObjectParsers.rentalDataParser);
    }

    return {
        getAllRentals,
        getOneRental,
        deleteRental
    }
})();

exports.RentalServiceAPI = RentalServiceAPI;