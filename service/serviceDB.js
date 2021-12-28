var mockStockList = require('../mock/mockStockList');
const modelVehicle = require('../models/vehicle');
const modelCategory = require('../models/category');

var serviceFilterAPI = (function singleFilterService() {

    const getStockList = function () {
        return modelVehicle.find();
    }

    return {

    }
})();

exports.serviceFilterAPI = serviceFilterAPI;