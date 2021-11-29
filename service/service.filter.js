var mockStockList = require('../mock/mockStockList');

var serviceFilterAPI = (function singleFilterService() {

    const getStockList = function () {
        return mockStockList;
    }

    // UNTOUCHABLE bcs need .sort()

    const getAllByPrice = function(requestedPrice) {
        let stockByRequestedPrice = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.price <= requestedPrice) {
                stockByRequestedPrice = [...stockByRequestedPrice, vehicle];
            }
        });
        //* Ordena la lista de mayor a menor
        return stockByRequestedPrice.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    const getAllByDiscountTax = function (discountTax) {
        let stockByDiscountTax = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.category.discountTax >= discountTax) {
                stockByDiscountTax = [...stockByDiscountTax, vehicle];
            }
        });
        //TODO: implementar método que ordene lista
        //* Ordena la lista de menor a mayor
        return stockByDiscountTax.sort(function (a, b) { return a.category.discountTax - b.category.discountTax });
    }

    const getAllByCategory = function (category) {
        let stockFilteredByCategory = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.category.name === category) {
                stockFilteredByCategory = [...stockFilteredByCategory, vehicle];
            }
        });
        return stockFilteredByCategory;
    }


    // GENERIC FILTER

    const genericFilter = function(requestedFilter, value) {
        let stockFiltered = [];
        mockStockList.forEach(vehicle => {
            if (isNaN(value))  {
                if (vehicle[requestedFilter] === value) {
                    stockFiltered = [...stockFiltered, vehicle];
                }
            }
            else {
                if (vehicle[requestedFilter] >= value) {
                    stockFiltered = [...stockFiltered, vehicle];
                }
            }
        });
        return stockFiltered;
    }

    // FIND ONE
    const getOneByModel = function (model) {
        return mockStockList.find(vehicle => vehicle.model === model);
    }

    return {
        getStockList,
        // SPECIFIC
        getAllByPrice,
        getAllByCategory,
        getAllByDiscountTax,
        // GENERIC
        genericFilter,
        // FIND ONE
        getOneByModel
    }
})();
exports.serviceFilterAPI = serviceFilterAPI;