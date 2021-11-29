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

//  UPDATE
router.get('/update', stockController.stockAPI.updatePriceStock);
router.get('/blackFriday', stockController.stockAPI.applyDiscount);
router.get('/blackFriday/restore', stockController.stockAPI.restorePrice);
router.get('/book/:brand/:model', stockController.stockAPI.bookVehicle);
router.get('/return/:brand/:model', stockController.stockAPI.returnVehicle);

// FIND ALL //
router.get('/brand/:brand', stockController.stockAPI.vehicleFindAllByBrand);
router.get('/color/:color', stockController.stockAPI.vehicleFindAllByColor);
/**
 * TODO
 * Se podría implementar un campo más en la url para ordenar en asc o desc ???
 * Ejemplo: /price/:price/:method --> pero que method solo pueda tener el valor "asc" o "desc"
 */
router.get('/price/:price', stockController.stockAPI.vehicleFindAllByPrice);
router.get('/category/:category', stockController.stockAPI.vehicleByCategory);
router.get('/discount/:discountTax', stockController.stockAPI.vehicleByDiscountTax);
router.get('/fuel/:fuel', stockController.stockAPI.vehicleFindAllByFuel);
router.get('/passengers/:passengersNum', stockController.stockAPI.vehicleFindAllByPassengersNum);
router.get('/year/:year', stockController.stockAPI.vehicleFindAllByYear);
//? El stock se debería filtrar por availability true o debería haver un endpoint aparte para buscar los vehiculos que estuvieran en true ???
// router.get('/available', stockController.stockAPI.vehicleFindAllByAvailability);

// FIND ONE
router.get('/model/:model', stockController.stockAPI.vehicleFindOneByModel);

module.exports = router;
