const vehicle = require('./../src/domain/vehicle/vehicle');

var vehicleAPI = (function singleVehicleController() {

    // const factory = function(req, res) {
    /////     res.send('NOT IMPLEMENTED: Meeseeks Box');
    //     res.status(200).type('json').json(box);
    // }

    const vehicleList = function(req, res) {
        res.status(200).send('NOT IMPLEMENTED: Vehicle list');
    }

    const vehicleFindOne = function(req, res) {
        res.status(200).send('NOT IMPLEMENTED: Vehicle find one');
    }

    const vehicleByCategory = function(req, res) {
        res.status(200).send('NOT IMPLEMENTED: Vehicle find by category');
    }

    const vehicleFindAllByBrand = function(req, res) {
        res.status(200).send('NOT IMPLEMENTED: Vehicle find all by brand');
    }

    return {
        vehicleList,
        vehicleFindOne,
        vehicleByCategory,
        vehicleFindAllByBrand
    };
})();

exports.vehicleAPI = vehicleAPI;