const vehicle = require('../src/domain/vehicle/vehicle');
const stockFilterService = require('../service/service.filter');
const stockDomainService = require('../service/service.domain');

var stockAPI = (function singleStockController() {

    // STOCK
    const stockList = function (req, res) {
        let stock = stockFilterService.serviceFilterAPI.getStockList();
        checkResponseIsDefined(stock) 
        ? res.status(200).type('json').json(stock)
        : res.status(404).send("We are currently out of stock");
    }

    // UPDATE PRICE
    const updatePriceStock = function(req, res) {
        let updatedStock = stockDomainService.ServiceDomainAPI.updatePriceStock();
        checkResponseIsDefined(updatedStock)
        ? res.status(200).type('json').json(updatedStock)
        : res.status(404).send("The price couldn't be updated");
    }

    const applyDiscount = function(req, res) {
        let applyDiscountStock = stockDomainService.ServiceDomainAPI.applyDiscount();
        checkResponseIsDefined(applyDiscountStock)
        ? res.status(200).type('json').json(applyDiscountStock)
        : res.status(404).send("The black friday discount couldn't be applied");
    }

    const restorePrice = function(req, res) {
        let restoredPriceStock = stockDomainService.ServiceDomainAPI.restorePrice();
        checkResponseIsDefined(restoredPriceStock)
        ? res.status(200).type('json').json(restoredPriceStock)
        : res.status(404).send("The prices couldn't be restored successfully");
    }

    const bookVehicle = function(req, res) {
        let bookedVehicle = stockDomainService.ServiceDomainAPI.bookVehicle(req.params.brand, req.params.model);
        checkResponseIsDefined(bookedVehicle)
        ? res.status(200).type('json').json(bookedVehicle)
        : res.status(404).send("The vehicle is not available");
    }

    const returnVehicle = function(req, res) {
        let returnedVehicle = stockDomainService.ServiceDomainAPI.returnVehicle(req.params.brand, req.params.model);
        checkResponseIsDefined(returnedVehicle)
        ? res.status(200).type('json').json(returnedVehicle)
        : res.status(404).send("This vehicle never was booked");
    }

    // FIND ALL
    const vehicleFindAllByBrand = function(req, res) {
        let allVehiclesByBrand = stockFilterService.serviceFilterAPI.getAllByBrand(req.params.brand);
        checkResponseIsDefined(allVehiclesByBrand)
        ? res.status(200).type('json').json(allVehiclesByBrand)
        : res.status(404).send("Brand not found");
    }

    const vehicleFindAllByColor = function(req, res) {
        res.status(200).send("Find all by color");
    }

    const vehicleFindAllByPrice = function(req, res) {
        let allVehiclesByPrice = stockFilterService.serviceFilterAPI.getAllByPrice(req.params.price);
        checkResponseIsDefined(allVehiclesByPrice)
        ? res.status(200).type('json').json(allVehiclesByPrice)
        : res.status(404).send("Brand not found");
    }

    const vehicleByCategory = function (req, res) {
        let allVehiclesByCategory = stockFilterService.serviceFilterAPI.getAllByCategory(req.params.category);
        checkResponseIsDefined(allVehiclesByCategory) 
        ? res.status(200).type('json').json(allVehiclesByCategory) 
        : res.status(404).send("Right now we don't have vehicles availables of this category");
        
    }

    const vehicleByDiscountTax = function (req, res) {
        let allVehiclesByDiscountTax = stockFilterService.serviceFilterAPI.getAllByDiscountTax(req.params.discountTax);
        checkResponseIsDefined(allVehiclesByDiscountTax)
        ? res.status(200).type('json').json(allVehiclesByDiscountTax)
        : res.status(404).send("We don't have vehicles availables with this discount tax");
    }

    const vehicleFindAllByFuel = function(req, res) {
        res.status(200).send("Find all by FUEL");
    }

    const vehicleFindAllByPassengersNum = function(req, res) {
        res.status(200).send("Find all by Passengers NUM");
    }

    const vehicleFindAllByYear = function(req, res) {
        res.status(200).send("Find all by YEAR");
    }

    const vehicleFindAllByAvailability = function(req, res) {
        res.status(200).send("Find all by AVAILABLES");
    }

    // FIND ONE
    // Solamanete nos interesa saber que ese modelo está disponible o existe, no cuantos hay
    const vehicleFindOneByModel = function(req, res) {
        let vehicleModel = stockFilterService.serviceFilterAPI.getOneByModel(req.params.model);
        checkResponseIsDefined(vehicleModel) 
        ? res.status(200).type('json').json(vehicleModel)
        : res.status(404).send("Currently we don't have this model available");
    }

    // RESPONSE CHECKER
    //! Los json obj único no los deveulve como true, ejemplo con findByModel
    //TODO: este error se produce al chequear la length, alguna ayuda ???
    const checkResponseIsDefined = function(response) {
        if (response !== undefined && response !== null && response.length > 0) {
            return true;
        }
        return false;
    }

    return {
        // STOCK
        stockList,
        // UPDATE
        updatePriceStock,
        applyDiscount,
        restorePrice,
        bookVehicle,
        returnVehicle,
        // FIND ALL
        vehicleFindAllByBrand,
        vehicleFindAllByColor,
        vehicleFindAllByPrice,
        vehicleByCategory,
        vehicleByDiscountTax,
        vehicleFindAllByFuel,
        vehicleFindAllByPassengersNum,
        vehicleFindAllByYear,
        vehicleFindAllByAvailability,
        // FIND ONE
        vehicleFindOneByModel
    };

})();

exports.stockAPI = stockAPI;