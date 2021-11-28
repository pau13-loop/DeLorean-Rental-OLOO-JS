const vehicle = require('./../src/domain/vehicle/vehicle');
const stockService = require('../service/service.filter');

var vehicleAPI = (function singleVehicleController() {

    const vehicleList = function (req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getStockList());
    }

    // FILTERS
    const vehicleFindOne = function (req, res) {
        res.status(200).send('NOT IMPLEMENTED: Vehicle find one');
    }

    const vehicleFindAllByBrand = function(req, res) {
        let allVehiclesByBrand = stockService.serviceAPI.getAllByBrand(req.params.brand);
        checkResponseIsDefined(allVehiclesByBrand)
        ? res.status(200).type('json').json(allVehiclesByBrand)
        : res.status(404).send("Brand not found");
    }

    // Solamanete nos interesa saber que ese modelo está disponible o existe, no cuantos hay
    const vehicleFindOneByModel = function(req, res) {
        console.log('Controller: ', req.params.model);
        res.status(200).type('json').json(stockService.serviceAPI.getOneByModel(req.params.model));
    }

    // CATEGORY
    const vehicleByCategory = function (req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getAllByCategory(req.params.category));
        
    }

    const vehicleByDiscountTax = function (req, res) {
        res.status(200).type('json').json(stockService.serviceAPI.getAllByDiscountTax(req.params.discountTax));
    }

    // RESPONSE CHECKER
    const checkResponseIsDefined = function(response) {
        if (response !== undefined && response !== null && response.length > 0) {
            return true;
        }
        return false;
    }

    return {
        vehicleList,
        // FILTERS
        vehicleFindOne,
        vehicleFindAllByBrand,
        vehicleFindOneByModel,
        // CATEGORY
        vehicleByCategory,
        vehicleByDiscountTax
    };

})();

exports.vehicleAPI = vehicleAPI;