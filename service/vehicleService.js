const Vehicle = require('../models/vehicle');

const VehicleServiceAPI = (function singletonVehicleService() {

    const getAllVehicles = () => {
        return Vehicle.find();
    }

    return {
        getAllVehicles
    }
})();

exports.VehicleServiceAPI = VehicleServiceAPI;