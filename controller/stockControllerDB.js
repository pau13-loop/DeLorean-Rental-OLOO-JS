const modelVehicle = require('../models/vehicle');

var stockAPI = (function singleStockController() {

    // STOCK //! COMPLETED
    const stockList = ((req, res, next) => {
        modelVehicle.find()
            .exec(function (err, stock) {
                if (err) { return next(err); }
                res.status(200).type('json').json(stock);
            });
    })

    return {
        stockList
    };

})();

exports.stockAPI = stockAPI;