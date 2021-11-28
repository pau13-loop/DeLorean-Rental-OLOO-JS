const mockStockList = require('../mock/mockStockList');
var vehiclesMock = require('../mock/mockStockList');

var serviceAPI = (function singleService() {

    const getStockList = function() {
        return vehiclesMock;
    }

    // FILTERS
    const getAllByBrand = function(brand) {
        let stockFilteredByBrand = [];
        vehiclesMock.forEach(vehicle => {
            if (vehicle.brand === brand) {
                //! Spreading
                stockFilteredByBrand = [...stockFilteredByBrand, vehicle];
            }
        });
        return stockFilteredByBrand;
    }

    const getOneByModel = function(model) {
        let requestedVehicle = mockStockList.find(vehicle => vehicle.model === model);
        if (requestedVehicle) {
            return requestedVehicle;
        }
        return {"errorMsg": "Vehicle not available"};
    }

    // CATEGORY
    const getAllByCategory = function(category) {
        let stockFilteredByCategory = [];
        vehiclesMock.forEach(vehicle => {
            if (vehicle.category.name === category) {
                //! Spreading
                stockFilteredByCategory = [...stockFilteredByCategory, vehicle];
            }
        });
        return stockFilteredByCategory;
    }

    const getAllByDiscountTax = function(discountTax) {
        let stockByDiscountTax = [];
        vehiclesMock.forEach(vehicle => {
            if (vehicle.category.discountTax >= discountTax) {
                stockByDiscountTax = [...stockByDiscountTax, vehicle];
            }
        });
        //TODO: implementar método que ordene lista
        return stockByDiscountTax.sort(function(a, b) {return a.category.discountTax - b.category.discountTax});
    }

    return {
        getStockList,
        getAllByBrand,
        getOneByModel,
        // CATEGORY
        getAllByCategory,
        getAllByDiscountTax
    }
})();

exports.serviceAPI = serviceAPI;