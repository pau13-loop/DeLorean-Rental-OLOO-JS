const VehicleProto = require('../domain/vehicle/vehicle');

const vehicleParser = (function singletonVehicleParser() {

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

    const getVehicleParsed = (data) => {
        let vehicle = {
            id: data._id,
            model: data.model,
            brand: data.brand,
            category: data.category,
            passengers: data.passengers,
            year: data.year,
            price: data.price,
            originalPrice: data.orginalPrice,
            available: data.available
        };
        return VehicleProto.setPrototypeVehicle(vehicle);
    };

    return {
        vehicleDataParser
    };
})();

exports.vehicleParser = vehicleParser;