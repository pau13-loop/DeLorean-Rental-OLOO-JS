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

// VEHICLE ROUTES //

router.get('/', vehicleController.vehicleAPI.vehicleList);

// Probablemente no necesario, ya que el id no lo conocen los usuarios
router.get('/:id', vehicleController.vehicleAPI.vehicleFindOne);

router.get('/brand/:brand', vehicleController.vehicleAPI.vehicleFindAllByBrand);
router.get('/model/:model', vehicleController.vehicleAPI.vehicleFindOneByModel);

// CATEGORY
router.get('/category/:category', vehicleController.vehicleAPI.vehicleByCategory);
router.get('/discount/:discountTax', vehicleController.vehicleAPI.vehicleByDiscountTax);

module.exports = router;
