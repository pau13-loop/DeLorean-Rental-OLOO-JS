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
router.get('/', stockController.stockAPI.vehicleList);

// FIND ALL //
router.get('/brand/:brand', stockController.stockAPI.vehicleFindAllByBrand);
router.get('/color/:color', stockController.stockAPI.vehicleFindAllByColor);
router.get('/price/:price', stockController.stockAPI.vehicleFindAllByPrice);
router.get('/category/:category', stockController.stockAPI.vehicleByCategory);
router.get('/discount/:discountTax', stockController.stockAPI.vehicleByDiscountTax);
router.get('/fuel/:fuel', stockController.stockAPI.vehicleFindAllByFuel);
router.get('/passengers/:passengersNum', stockController.stockAPI.vehicleFindAllByPassengersNum);
router.get('/year/:year', stockController.stockAPI.vehicleFindAllByYear);
router.get('/available', stockController.stockAPI.vehicleFindAllByAvailability);

// FIND ONE
router.get('/model/:model', stockController.stockAPI.vehicleFindOneByModel);

module.exports = router;
