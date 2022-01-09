const vehicleService = require('../service/vehicleService');
const responseFormatter = require('../utils/responseFormatter');

const VehicleAPI = (function singletonVehicleController() {

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
            : res.status(200).send("Vehicle to delete not found");
        })
        .catch((err) => {
            const response = responseFormatter(err);
            res.status(400).type('json').json(response);
        });
    });

    const createVehicle = ((req, res, next) => {
        vehicleService.VehicleServiceAPI.createVehicle(req.body)
        .then((data) => {
            const response = responseFormatter(null, data, 'Request create vehicle succesfull')
            res.status(202).type('json').json(response);
        })
        .catch((err) => {
            const response = responseFormatter(err);
            res.status(400).type('json').json(response);
        });
    });

    const updateVehicle = ((req, res, next) => {
        vehicleService.VehicleServiceAPI.updateVehicle(req.params.id, req.body)
        .then((data) => {
            const response = data 
            ? responseFormatter(null, data, 'Request vehicle updated succesfully')
            : responseFormatter(null, data, 'Requested vehicle to update not found');
            res.status(202).type('json').json(response);
        })
        .catch((err) => {
            const response = responseFormatter(err);
            res.status(400).type('json').json(response);
        });
    });

    return {
        vehicleFindAll,
        vehiclesFindOne,
        vehicleDeleteOne,
        createVehicle,
        updateVehicle
    }
})();

exports.VehicleAPI = VehicleAPI;