const vehicle = require('./../src/domain/vehicle/vehicle');
const stockResource = require('../resource/stockResource');
const stockService = require('../service/service');

var vehicleAPI = (function singleVehicleController() {

    // const factory = function(req, res) {
    /////     res.send('NOT IMPLEMENTED: Meeseeks Box');
    //     res.status(200).type('json').json(box);
    // }

    //? El modulo resource nos lo podemos ahorrar ???
    //* Ya que en principio el la logica de Ollivaners habiamos creado uno ya que el controller actuaba como el router y el resource de Ollivanders actuaria como el controller de node

    // const vehicleList = function(req, res) {
    //     res.status(200).type('json').json(stockResource.stockResource.getStock());
    //     // res.status(200).send('NOT IMPLEMENTED: Vehicle list');
    // }

        const vehicleList = function(req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getStockList());
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