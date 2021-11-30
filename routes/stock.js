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

// STOCK ROUTES //
router.get('/', stockController.stockAPI.stockList);
router.get('/available', stockController.stockAPI.availableStockList);

//  DOMAIN
router.get('/update', stockController.stockAPI.updatePriceStock);
router.get('/blackFriday', stockController.stockAPI.applyDiscount);
router.get('/blackFriday/restore', stockController.stockAPI.restorePrice);
router.get('/book/:brand/:model', stockController.stockAPI.bookVehicle);
router.get('/return/:brand/:model', stockController.stockAPI.returnVehicle);

// FIND ALL
/**
 * TODO
 * Se podría implementar un campo más en la url para ordenar en asc o desc ???
 * Ejemplo: /price/:price/:method --> pero que method solo pueda tener el valor "asc" o "desc"
 */
//* En la llamada a la BD ya puedo hacer que me de los obj ordenados según como me interesa
router.get('/price/:price', stockController.stockAPI.vehicleFindAllByPrice);
router.get('/discount/:discountTax', stockController.stockAPI.vehicleByDiscountTax);
router.get('/category/:category', stockController.stockAPI.vehicleByCategory);

// FIND ONE
router.get('/model/:model', stockController.stockAPI.vehicleFindOneByModel);

// GENERIC FINDS
router.get('/brand/:brand', stockController.stockAPI.filterStock);
router.get('/year/:year', stockController.stockAPI.filterStock);

module.exports = router;