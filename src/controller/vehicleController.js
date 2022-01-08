const vehicle = require('../db/models/vehicle');
const vehicleService = require('../service/vehicleService');

const vehicleAPI = (function singletonVehicleController() {
    
    const vehicleFindAll =((req, res, next) => {
        let response = vehicleService.VehicleServiceAPI.getAllVehicles();
        responseChecker(res, next, response);
    });

    const vehiclesFindOne = ((req, res, next) => {
        let response = vehicleService.VehicleServiceAPI.getOneVehicle(req.params.model);
        responseChecker(res, next, response);
    });

    const vehicleDeleteOne = ((req, res, next) => {
        let response = vehicleService.VehicleServiceAPI.deleteVehicle(req.params.model);
        responseChecker(res, next, response);
    });

    // UPDATE PRICE DOMAIN
    const updatePrice = ((req, res, next) => {
        const query = {};
        const update = {};
        const options = {"upster": false};

        let response = vehicle.updateMany(query, update, options) 
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                console.log(`Successfully matched ${matchedCount} and modified count ${modifiedCount} items`);
                return result;
            })
            .catch(err => console.error(`Failed to update items: ${err}`));

        response.exec(function (err, result) {
            if (err) {return next(err)}
            res.status(200).send(response);
        })
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
        vehicleFindAll,
        vehiclesFindOne,
        vehicleDeleteOne,
        updatePrice
    }
})();

exports.vehicleAPI = vehicleAPI;