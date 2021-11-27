const mockStockList = require('../mock/mockStockList');
var vehiclesMock = require('../mock/mockStockList');

var serviceAPI = (function singleService() {

    const getStockList = function() {
        return vehiclesMock;
    }

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


    return {
        getStockList,
        getAllByBrand,
        getOneByModel,
        getAllByCategory
    }
})();

exports.serviceAPI = serviceAPI;