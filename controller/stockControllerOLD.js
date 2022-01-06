const stockFilterService = require('../service/service.filter');
const stockDomainService = require('../service/service.domain');

var stockAPI = (function singleStockController() {

    // STOCK //! COMPLETED
    const stockList = function (req, res) {
        let stock = stockFilterService.serviceFilterAPI.getStockList();
        checkResponseIsDefined(stock) 
        ? res.status(200).type('json').json(stock)
        : res.status(404).send("We are currently out of stock");
    }

    const availableStockList = function(req, res) {
        let availableStock = stockFilterService.serviceFilterAPI.getStockAvailalbe();
        checkResponseIsDefined(availableStock) 
        ? res.status(200).type('json').json(availableStock)
        : res.status(404).send("Right now we don't have any available car");
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
        ? res.status(200).send('Your vehicle has been booked')
        : res.status(404).send("The vehicle is not available");
    }

    const returnVehicle = function(req, res) {
        let returnedVehicle = stockDomainService.ServiceDomainAPI.returnVehicle(req.params.brand, req.params.model);
        checkResponseIsDefined(returnedVehicle)
        ? res.status(200).type('json').json(returnedVehicle)
        : res.status(404).send("This vehicle never was booked");
    }

    //! COMPLETED
    // FIND ALL

    const vehicleFindAllByPrice = function(req, res) {
        let allVehiclesByPrice = stockFilterService.serviceFilterAPI.getAllByPrice(req.params.price);
        checkResponseIsDefined(allVehiclesByPrice)
        ? res.status(200).type('json').json(allVehiclesByPrice)
        : res.status(404).send("We haven't got vehicle of this price or lower");
    }

    const vehicleByDiscountTax = function (req, res) {
        let allVehiclesByDiscountTax = stockFilterService.serviceFilterAPI.getAllByDiscountTax(req.params.discountTax);
        checkResponseIsDefined(allVehiclesByDiscountTax)
        ? res.status(200).type('json').json(allVehiclesByDiscountTax)
        : res.status(404).send("We don't have vehicles availables with this discount tax");
    }

    const vehicleByCategory = function (req, res) {
        let allVehiclesByCategory = stockFilterService.serviceFilterAPI.getAllByCategory(req.params.category);
        checkResponseIsDefined(allVehiclesByCategory) 
        ? res.status(200).type('json').json(allVehiclesByCategory) 
        : res.status(404).send("Right now we don't have vehicles availables of this category");
        
    }

    //! COMPLETED
    // FIND ONE

    // Solamanete nos interesa saber que ese modelo está disponible o existe, no cuantos hay
    const vehicleFindOneByModel = function(req, res) {
        let vehicleModel = stockFilterService.serviceFilterAPI.getOneByModel(req.params.model);
        checkResponseIsDefined(vehicleModel) 
        ? res.status(200).type('json').json(vehicleModel)
        : res.status(404).send("Currently we don't have this model available");
    }

    //! COMPLETED

    // GENERIC FILTER
    const filterStock = function(req, res) {
        let stockFiltered = stockFilterService.serviceFilterAPI.genericFilter(Object.keys(req.params)[0], Object.values(req.params)[0]);
        checkResponseIsDefined(stockFiltered)
        ? res.status(200).type('json').json(stockFiltered)
        : res.status(404).send("The request couldn't be supplied sorry");
    }

    // RESPONSE CHECKER
    const checkResponseIsDefined = function(response) {
        if (response !== undefined && response !== null && (response.length > 0 || Object.keys(response).length > 0)) {
            return true;
        }
        return false;
    }

    return {
        // STOCK
        stockList,
        availableStockList,
        // UPDATE
        updatePriceStock,
        applyDiscount,
        restorePrice,
        bookVehicle,
        returnVehicle,
        // UNTOUCHABLE
        vehicleFindAllByPrice,
        vehicleByDiscountTax,
        vehicleByCategory,
        // GENERIC
        filterStock,
        // FIND ONE
        vehicleFindOneByModel
    };

})();

exports.stockAPI = stockAPI;