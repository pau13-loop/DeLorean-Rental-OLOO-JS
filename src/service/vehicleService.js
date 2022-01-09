const Vehicle = require('../db/models/vehicle');
const Category = require('../db/models/category');
const objectParsers = require('../utils/objectParsers');

const VehicleServiceAPI = (function singletonVehicleService() {

    const getAllVehicles = () => {
        return Vehicle.find().then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    const getOneVehicle = (key, value) => {
        return (key === 'id'
            ? Vehicle.findById(value)
            : Vehicle.findOne({ [key]: value }))
            .exec()
            .then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    const deleteVehicle = (key, value) => {
        return (key === 'id'
            ? Vehicle.findByIdAndDelete(value)
            : Vehicle.findOneAndDelete({ [key]: value }))
            .exec()
            .then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    const createVehicle = async (data) => {
        let categoryVehicle = await Category.findOne({ name: data.category });
        let newVehicle = new Vehicle({
            model: data.model,
            brand: data.brand,
            category: categoryVehicle.id,
            passengers: data.passengers,
            year: data.year,
            price: data.price
        });
        return newVehicle.save().then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    const updateVehicle = async (id, data) => {
        let categoryVehicle = await Category.findOne({ name: data.category });
        let update = {
            model: data.model,
            brand: data.brand,
            category: categoryVehicle.id,
            passengers: data.passengers,
            year: data.year,
            price: data.price,
            availalbe: data.available
        };
        // Set new to true to return the document after the update
        return Vehicle.findByIdAndUpdate(id, update, { new: true })
            .exec()
            .then(objectParsers.ObjectParsers.vehicleDataParser);
    }

    const findAvailableVehicles = async () => {
        //TODO: Set
        //! I was not able to use the set with a collection of objects, just with primitive types to get a collection of unique elements
        // return [...new Set(vehiclesList)];
        let vehiclesList = await Vehicle.find({ available: true });
        return vehiclesList.length > 0
        ? [...new Map(vehiclesList.map((vehicle) => [vehicle['model'], vehicle]))]
        : null; 
    }

    return {
        getAllVehicles,
        getOneVehicle,
        deleteVehicle,
        createVehicle,
        updateVehicle,
        findAvailableVehicles
    }
})();

exports.VehicleServiceAPI = VehicleServiceAPI;