const Vehicle = require('../db/models/vehicle');
const VehicleProto = require('../domain/vehicle/vehicle');
const Category = require('../db/models/category');
const CategoryProto = require('../domain/category/category');
const VehicleParser = require('../utils/parsers/vehicle-parser');

const VehicleServiceAPI = (function singletonVehicleService() {
        //! Private
        const _setPrototyeVehicles = async (vehiclesList) => {
            return Promise.all(vehiclesList.map(async (vehicle) => {
                let category = await Category.findById(vehicle.category.toString());

                const {id, ...categoryProto} = category.toObject();
                const { _id, ...vehicleProto } = vehicle.toObject();
    
                vehicleProto.category = CategoryProto.setPrototypeCategory(categoryProto);
                return VehicleProto.setPrototypeVehicle(vehicleProto);
            }));
        }

    const getAllVehicles = () => {
        return Vehicle.find().then(VehicleParser.VehicleParser.vehicleDataParser);
    }

    const getOneVehicle = (key, value) => {
        return (key === 'id'
            ? Vehicle.findById(value)
            : Vehicle.findOne({ [key]: value }))
            .exec()
            .then(VehicleParser.VehicleParser.vehicleDataParser);
    }

    const deleteVehicle = (key, value) => {
        return (key === 'id'
            ? Vehicle.findByIdAndDelete(value)
            : Vehicle.findOneAndDelete({ [key]: value }))
            .exec()
            .then(VehicleParser.VehicleParser.vehicleDataParser);
    }

    const createVehicle = async (data) => {
        let categoryVehicle = await Category.findOne({ name: data.category });
        let newVehicle = new Vehicle({
            model: data.model,
            brand: data.brand,
            category: categoryVehicle.id,
            year: data.year,
            price: data.price,
            ORIGINAL_PRICE: data.ORIGINAL_PRICE
        });
        return newVehicle.save().then(VehicleParser.VehicleParser.vehicleDataParser);
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
            availalbe: data.isAvailable
        };
        // Set new to true to return the document after the update
        return Vehicle.findByIdAndUpdate(id, update, { new: true })
            .exec()
            .then(VehicleParser.VehicleParser.vehicleDataParser);
    }

    const findAvailableVehicles = async () => {
        //TODO: Set
        //! I was not able to use the set with a collection of objects, just with primitive types to get a collection of unique elements
        // return [...new Set(vehiclesList)];
        let vehiclesList = await Vehicle.find({ isAvailable: true });
        return vehiclesList.length > 0
            ? [...new Map(vehiclesList.map((vehicle) => [vehicle['model'], VehicleParser.VehicleParser.vehicleDataParser(vehicle)]))]
            : null;
    }

    const updatePriceVehicles = async () => {
        //! If we dont parse the mongoose object to json object. When applied the destructing techique we will get all the internal cache of the mongoose object
        // let availableVehiclesList = await Vehicle.find({ available: true }).exec().then(VehicleParser.VehicleParser.vehicleDataParser);
        //! we can not use the parser if we want to .save() the mongo object back after has been updated
        let availableVehiclesList = await Vehicle.find({ isAvailable: true }).exec();

        var protoVehiclesList = await _setPrototyeVehicles(availableVehiclesList);
        protoVehiclesList.forEach((vehicle) => { vehicle.updatePrice() });

        availableVehiclesList.forEach((vehicle, index) => {
            vehicle.price = protoVehiclesList[index].price;
            vehicle.save();
        });
        
        return VehicleParser.VehicleParser.vehicleDataParser(availableVehiclesList);
    }

    const applyDiscountTaxVehicles = async () => {
        let availableVehiclesList = await Vehicle.find({ isAvailable: true }).exec();
        var protoVehiclesList = await _setPrototyeVehicles(availableVehiclesList);

        protoVehiclesList.forEach((vehicle) => { vehicle.price = vehicle.category.applyDiscount(vehicle.price) });
        availableVehiclesList.forEach((vehicle, index) => {
            vehicle.price = protoVehiclesList[index].price;
            vehicle.save();
        });

        return VehicleParser.VehicleParser.vehicleDataParser(availableVehiclesList);
    }

    return {
        getAllVehicles,
        getOneVehicle,
        deleteVehicle,
        createVehicle,
        updateVehicle,
        findAvailableVehicles,
        updatePriceVehicles,
        applyDiscountTaxVehicles
    }
})();

exports.VehicleServiceAPI = VehicleServiceAPI;