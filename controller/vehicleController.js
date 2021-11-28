const vehicle = require('./../src/domain/vehicle/vehicle');
const stockService = require('../service/service.filter');

var vehicleAPI = (function singleVehicleController() {

    // STOCK
    const vehicleList = function (req, res) {
        let stock = stockService.serviceAPI.getStockList();
        checkResponseIsDefined(stock) 
        ? res.status(200).type('json').json(stock)
        : res.status(404).send("We are currently out of stock");
    }

    // FIND ALL
    const vehicleFindAllByBrand = function(req, res) {
        let allVehiclesByBrand = stockService.serviceAPI.getAllByBrand(req.params.brand);
        checkResponseIsDefined(allVehiclesByBrand)
        ? res.status(200).type('json').json(allVehiclesByBrand)
        : res.status(404).send("Brand not found");
    }

    const vehicleByCategory = function (req, res) {
        let allVehiclesByCategory = stockService.serviceAPI.getAllByCategory(req.params.category);
        checkResponseIsDefined(allVehiclesByCategory) 
        ? res.status(200).type('json').json(allVehiclesByCategory) 
        : res.status(404).send("Right now we don't have vehicles availables of this category");
        
    }

    const vehicleByDiscountTax = function (req, res) {
        let allVehiclesByDiscountTax = stockService.serviceAPI.getAllByDiscountTax(req.params.discountTax);
        checkResponseIsDefined(allVehiclesByDiscountTax)
        ? res.status(200).type('json').json(allVehiclesByDiscountTax)
        : res.status(404).send("We don't have vehicles availables with this discount tax");
    }

    // FIND ONE
    // Solamanete nos interesa saber que ese modelo está disponible o existe, no cuantos hay
    const vehicleFindOneByModel = function(req, res) {
        let vehicleModel = stockService.serviceAPI.getOneByModel(req.params.model);
        checkResponseIsDefined(vehicleModel) 
        ? res.status(200).type('json').json(vehicleModel)
        : res.status(404).send("Currently we don't have this model available");
    }

    // RESPONSE CHECKER
    const checkResponseIsDefined = function(response) {
        if (response !== undefined && response !== null && response.length > 0) {
            return true;
        }
        return false;
    }

    return {
        // STOCK
        vehicleList,
        // FIND ALL
        vehicleFindAllByBrand,
        vehicleByCategory,
        vehicleByDiscountTax,
        // FIND ONE
        vehicleFindOneByModel
    };

})();

exports.vehicleAPI = vehicleAPI;