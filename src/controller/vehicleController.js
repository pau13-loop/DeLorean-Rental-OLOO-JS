const vehicle = require('../db/models/vehicle');
const vehicleService = require('../service/vehicleService');
const responseFormatter = require('../utils/responseFormatter');

const vehicleAPI = (function singletonVehicleController() {

    const vehicleFindAll = ((req, res, next) => {
        vehicleService.VehicleServiceAPI.getAllVehicles()
            .then((data) => {
                const response = responseFormatter(null, data, 'Request vehicle findAll succesfull');
                res.status(200).type('json').json(response);
            }).catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const vehiclesFindOne = ((req, res, next) => {
        vehicleService.VehicleServiceAPI.getOneVehicle(req.params.key, req.params.value)
            .then((data) => {
                const response = responseFormatter(null, data, 'Request vehicle findOne succesfull');
                res.status(200).type('json').json(response);
            }).catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });

    });

    const vehicleDeleteOne = ((req, res, next) => {
        vehicleService.VehicleServiceAPI.deleteVehicle(req.params.key, req.params.value)
        .then((data) => {
            // Not sending body response when status code is 204 --> No Content
            data 
            ? res.status(204).send("Success!")
            : res.status(200).send("Category to delete not found");
        })
        .catch((err) => {
            const response = responseFormatter(err);
            res.status(400).type('json').json(response);
        });
    });

    //! REFACTOR
    // UPDATE PRICE DOMAIN
    const updatePrice = ((req, res, next) => {
        const query = {};
        const update = {};
        const options = { "upster": false };

        let response = vehicle.updateMany(query, update, options)
            .then(result => {
                const { matchedCount, modifiedCount } = result;
                console.log(`Successfully matched ${matchedCount} and modified count ${modifiedCount} items`);
                return result;
            })
            .catch(err => console.error(`Failed to update items: ${err}`));

        response.exec(function (err, result) {
            if (err) { return next(err) }
            res.status(200).send(response);
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