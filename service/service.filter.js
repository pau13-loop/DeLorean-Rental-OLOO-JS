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

    const getAllByCategory = function (category) {
        let stockFilteredByCategory = [];
        mockStockList.forEach(vehicle => {
            if (vehicle.category.name === category) {
                //! Spreading
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
        return stockByDiscountTax.sort(function (a, b) { return a.category.discountTax - b.category.discountTax });
    }

    // FIND ONE
    const getOneByModel = function (model) {
        return mockStockList.find(vehicle => vehicle.model === model);
    }

    return {
        getStockList,
        // FIND ALL
        getAllByBrand,
        getAllByCategory,
        getAllByDiscountTax,
        // FIND ONE
        getOneByModel
    }
})();

exports.serviceFilterAPI = serviceFilterAPI;