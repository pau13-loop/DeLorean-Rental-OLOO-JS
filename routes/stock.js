var express = require('express');
var router = express.Router();

// Controller modules 
var stockController = require('../controller/stockController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//! COMPLETED
// STOCK ROUTES //
router.get('/', stockController.stockAPI.stockList);
router.get('/available', stockController.stockAPI.availableStockList);

//  DOMAIN
router.get('/update', stockController.stockAPI.updatePriceStock);
router.get('/blackFriday', stockController.stockAPI.applyDiscount);
router.get('/blackFriday/restore', stockController.stockAPI.restorePrice);
router.put('/book/:brand/:model', stockController.stockAPI.bookVehicle);
router.get('/return/:brand/:model', stockController.stockAPI.returnVehicle);

//! COMPLETED
// FIND ALLs
router.get('/price/:price', stockController.stockAPI.vehicleFindAllByPrice);
router.get('/discount/:discountTax', stockController.stockAPI.vehicleByDiscountTax);
router.get('/category/:category', stockController.stockAPI.vehicleByCategory);

//! COMPLETED
// FIND ONE
router.get('/model/:model', stockController.stockAPI.vehicleFindOneByModel);

//! COMPLETED
// GENERIC FINDS
router.get('/brand/:brand', stockController.stockAPI.filterStock);
router.get('/year/:year', stockController.stockAPI.filterStock);

module.exports = router;