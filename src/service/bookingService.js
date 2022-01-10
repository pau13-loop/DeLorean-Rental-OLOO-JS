const Booking = require('../db/models/booking');
const Customer = require('../db/models/customer');
const Vehicle = require('../db/models/vehicle');
const objectParsers = require('../utils/objectParsers');

const BookingServiceAPI = (function singletonCategoryService() {

    const getAllBookings = () => {
        return Booking.find().then(objectParsers.ObjectParsers.bookingDataParser);
    }

    const getOneBooking = (key, value) => {
        return (key === 'id'
            ? Booking.findById(value)
            : Booking.findOne({ [key]: value }))
            .exec()
            .then(objectParsers.ObjectParsers.bookingDataParser);
    }

    const deleteBooking = async (key, value) => {
        let bookingToDelete = key === 'id'
            ? await Booking.findById(value)
            : await Booking.findOne({ [key]: value });

        if (bookingToDelete) {
            // Vehicle comeback to be available before delete the booking
            let vehicleToUnBook = await Vehicle.findById(bookingToDelete.vehicle);
            Vehicle.findByIdAndUpdate(vehicleToUnBook.id, { available: true }).exec();
            return Booking.findByIdAndDelete(bookingToDelete.id)
                .exec()
                .then(objectParsers.ObjectParsers.bookingDataParser);
        }
        return null;
    }

    const createBooking = async (data) => {
        // TODO: Destructing 
        const {dniNumber, dniLetter, vehicleModel, vehicleBrand} = data;
        // Necessary specify dni number and the dni letter of a customer when try to make a booking, by this way we ensure that the customer found it by the query is the customer we are looking for
        //? Why is that ? Because the costumer never will know with which id he has been saved into the DB
        let customerBooking = await Customer.findOne({ dniNumber: dniNumber, dniLetter: dniLetter });
        // To match the desired vehicle
        let vehicleBooking = await Vehicle.findOne({ model: vehicleModel, brand: vehicleBrand });
        if (vehicleBooking.available && customerBooking) {
            let newBooking = new Booking({
                startDate: data.startDate,
                endDate: data.endDate,
                customer: customerBooking.id,
                vehicle: vehicleBooking.id
            });
            Vehicle.findByIdAndUpdate(vehicleBooking.id, { available: false }).exec();
            return newBooking.save().then(objectParsers.ObjectParsers.bookingDataParser);
        }
        return null;
    }

    return {
        getAllBookings,
        getOneBooking,
        deleteBooking,
        createBooking
    }
})();

exports.BookingServiceAPI = BookingServiceAPI;