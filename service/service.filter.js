var mockStockList = require('../mock/mockStockList');

var serviceFilterAPI = (function singleFilterService() {

    const getStockList = function () {
        return mockStockList;
    }

    // FIND ALL
    const getAllByBrand = function (brand) {
        let stockFilteredByBrand = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.brand === brand) {
                //! Spreading
                stockFilteredByBrand = [...stockFilteredByBrand, vehicle];
            }
        });
        return stockFilteredByBrand;
    }

    const getAllByColor = function(color) {
        let stockByColor = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.color === color) {
                stockByColor = [...stockByColor, vehicle];
            }
        });
        return stockByColor;
    }

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

    const getAllByCategory = function (category) {
        let stockFilteredByCategory = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.category.name === category) {
                stockFilteredByCategory = [...stockFilteredByCategory, vehicle];
            }
        });
        return stockFilteredByCategory;
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

    const getAllByFuel = function(fuel) {
        let stockByFuel = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.fuel === fuel) {
                stockByFuel = [...stockByFuel, vehicle];
            }
        });
        return stockByFuel;
    }

    // FIND ONE
    const getOneByModel = function (model) {
        return mockStockList.find(vehicle => vehicle.model === model);
    }

    return {
        getStockList,
        // FIND ALL
        getAllByBrand,
        getAllByColor,
        getAllByPrice,
        getAllByCategory,
        getAllByDiscountTax,
        getAllByFuel,
        // FIND ONE
        getOneByModel
    }
})();

exports.serviceFilterAPI = serviceFilterAPI;