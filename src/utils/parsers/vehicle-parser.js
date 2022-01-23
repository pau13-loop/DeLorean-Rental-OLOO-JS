const VehicleParser = (function singletonVehicleParser() {
    //! Private
    const _getVehicleParsed = (data) => {
        return {
            id: data._id,
            model: data.model,
            brand: data.brand,
            category: data.category,
            passengers: data.passengers,
            year: data.year,
            price: data.price,
            isAvailable: data.isAvailable
        };
    };

    const vehicleDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                //TODO: Map
                return data.map(vehicle => {
                    return _getVehicleParsed(vehicle);
                });
            }
            return _getVehicleParsed(data);
        }
        return null;
    };

    return {
        vehicleDataParser
    };
})();

exports.VehicleParser = VehicleParser;