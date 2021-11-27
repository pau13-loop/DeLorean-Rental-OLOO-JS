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

    const vehicleList = function (req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getStockList());
    }

    const vehicleFindOne = function (req, res) {
        res.status(200).send('NOT IMPLEMENTED: Vehicle find one');
    }

    const vehicleFindAllByBrand = function(req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getAllByBrand(req.params.brand));
    }

    // Solamanete nos interesa saber que ese modelo está disponible o existe, no cuantos hay
    const vehicleFindOneByModel = function(req, res) {
        console.log('Controller: ', req.params.model);
        res.status(200).type('json').json(stockService.serviceAPI.getOneByModel(req.params.model));
    }

    const vehicleByCategory = function (req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getAllByCategory(req.params.category));
        
    }

    return {
        vehicleList,
        vehicleFindOne,
        vehicleByCategory,
        vehicleFindAllByBrand,
        vehicleFindOneByModel
    };

})();

exports.vehicleAPI = vehicleAPI;