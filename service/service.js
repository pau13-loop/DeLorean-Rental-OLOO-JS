var vehiclesMock = require('../mock/mockStockList');

var serviceAPI = (function singleService() {

    const getStockList = function() {
        return vehiclesMock;
    }

    return {
        getStockList
    }
})();

exports.serviceAPI = serviceAPI;