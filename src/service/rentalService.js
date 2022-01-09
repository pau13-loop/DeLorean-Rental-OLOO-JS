const Rental = require('../db/models/rental');
const Customer = require('../db/models/customer');
const Vehicle = require('../db/models/vehicle');
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

    //! Volver a poner coche en available
    const deleteRental = (key, value) => {
        let bookingToDelete = key === 'id' 
        ? Rental.findByIdAndDelete(value)
        : Rental.findOneAndDelete({[key]: value});

        let vehicleToUnBook = Vehicle.findById(bookingToDelete.vehicle);
        // return (key === 'id' 
        //     ? Rental.findByIdAndDelete(value)
        //     : Rental.findOneAndDelete({[key]: value}))
        //     .exec()
        //     .then(objectParsers.ObjectParsers.rentalDataParser);
    }

    const createRental = async (data) => {
        // Necessary specify dni and the dni letter of a customer when try to make a booking, by this way we ensure that the customer found it by the query is the customer we are looking for
        //? Because the costumer never will know with which id he has been saved into the DB
        let customerBooking = await Customer.findOne({dniNumber: data.dniNumber, dniLetter: data.dniLetter});
        // To match the desired vehicle
        let vehicleBooking = await Vehicle.findOne({model: data.vehicleModel, brand: data.vehicleBrand});
        if (vehicleBooking.available && customerBooking) {
            let newBooking = new Rental({
                startDate: data.startDate,
                endDate: data.endDate,
                customer: customerBooking.id,
                vehicle: vehicleBooking.id
            });
            Vehicle.findByIdAndUpdate(vehicleBooking.id, {available: false}).exec();
            return newBooking.save().then(objectParsers.ObjectParsers.rentalDataParser);
        }
        return null;
    }

    return {
        getAllRentals,
        getOneRental,
        deleteRental,
        createRental
    }
})();

exports.RentalServiceAPI = RentalServiceAPI;