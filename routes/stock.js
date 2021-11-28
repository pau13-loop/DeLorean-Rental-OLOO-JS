var express = require('express');
var router = express.Router();

// Controller modules 
var vehicleController = require('../controller/vehicleController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

// STOCK ROUTES //
router.get('/', vehicleController.vehicleAPI.vehicleList);

// FIND ALL //
router.get('/brand/:brand', vehicleController.vehicleAPI.vehicleFindAllByBrand);
router.get('/category/:category', vehicleController.vehicleAPI.vehicleByCategory);
router.get('/discount/:discountTax', vehicleController.vehicleAPI.vehicleByDiscountTax);

// FIND ONE
router.get('/model/:model', vehicleController.vehicleAPI.vehicleFindOneByModel);

module.exports = router;
