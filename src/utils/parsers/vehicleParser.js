// const VehicleProto = require('../domain/vehicle/vehicle');
const CategoryParser = require('./categoryParser');

const VehicleParser = (function singletonVehicleParser() {

    const vehicleDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                //TODO: Map
                return data.map(vehicle => {
                    return getVehicleParsed(vehicle);
                });
            }
            return getVehicleParsed(data);
        }
        return null;
    };

    //! Private
    const getVehicleParsed = (data) => {
        return {
            id: data._id,
            model: data.model,
            brand: data.brand,
            category: data.category,
            passengers: data.passengers,
            year: data.year,
            price: data.price,
            // originalPrice: data.orginalPrice,
            isAvailable: data.isAvailable
        };
    };

    return {
        vehicleDataParser
    };
})();

exports.VehicleParser = VehicleParser;