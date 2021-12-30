const vehicleService = require('../service/vehicleService');

const vehicleAPI = (function singletonVehicleController() {
    const vehicleFindAll =((req, res, next) => {
        let response = vehicleService.VehicleServiceAPI.getAllVehicles();
        responseChecker(res, next, response);
    });

    const responseChecker = ((res, next, object) => {
        object.exec(function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).type('json').json(result);
        })
    });

    return {
        vehicleFindAll
    }
})();

exports.vehicleAPI = vehicleAPI;