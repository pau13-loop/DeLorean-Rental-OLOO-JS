var mockStockList = require('../mock/mockStockList');
const modelVehicle = require('../models/vehicle');
const modelCategory = require('../models/category');

var serviceFilterAPI = (function singleFilterService() {

    const getStockList = function () {
        return modelVehicle.find();
    }

    const getStockAvailalbe = function () {
        let stockAvailable = [];
        mockStockList.forEach(vehicle => {
            //TODO: Restructing
            vehicle.available && (stockAvailable = [...stockAvailable, vehicle]);
        });
        return stockAvailable;
    }

    //! COMPLETED
    // FIND ALLs
    const getAllByPrice = function (requestedPrice) {
        let stockByRequestedPrice = [];
        mockStockList.forEach(vehicle => {
            vehicle.price <= requestedPrice && (stockByRequestedPrice = [...stockByRequestedPrice, vehicle]);
        });
        //TODO: Sort list from smallest to biggest
        return stockByRequestedPrice.sort(function (a, b) {
            return a.price - b.price;
        });
    }

    const getAllByDiscountTax = function (discountTax) {
        let stockByDiscountTax = [];
        mockStockList.forEach(vehicle => {
            vehicle.category.discountTax >= discountTax && (stockByDiscountTax = [...stockByDiscountTax, vehicle]);
        });
        //TODO: Sort list from biggest to smallest
        return stockByDiscountTax.sort(function (a, b) { return b.category.discountTax - a.category.discountTax });
    }

    const getAllByCategory = function (category) {
        let stockFilteredByCategory = [];
        //TODO: .foreEach()
        mockStockList.forEach(vehicle => {
            vehicle.category.name === category && (stockFilteredByCategory = [...stockFilteredByCategory, vehicle]);
        });
        return stockFilteredByCategory;
    }

    //! COMPLETED
    // GENERIC FILTER
    const genericFilter = function (requestedFilter, value) {
        let stockFiltered = [];
        mockStockList.forEach(vehicle => {
            if (isNaN(value)) {
                vehicle[requestedFilter] === value && (stockFiltered = [...stockFiltered, vehicle]);
            }
            else {
                vehicle[requestedFilter] >= value && (stockFiltered = [...stockFiltered, vehicle]);
            }
        });
        return stockFiltered;
    }

    // FIND ONE
    const getOneByModel = function (model) {
        //TODO: .find()
        return mockStockList.find(vehicle => vehicle.model === model);
    }

    return {
        getStockList,
        getStockAvailalbe,
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