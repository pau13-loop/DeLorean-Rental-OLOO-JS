var service = require('../service/service');

var stockResource = (function singleStockResource() {

    const getStock = function () {
        return service.serviceAPI.getStockList();
    }

    return {
        getStock
    };
})();

exports.stockResource = stockResource;