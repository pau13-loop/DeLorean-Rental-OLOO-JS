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
router.get('/:id', vehicleController.vehicleAPI.vehicleFindOne);
router.get('/:category', vehicleController.vehicleAPI.vehicleByCategory);
router.get('/:brand', vehicleController.vehicleAPI.vehicleFindAllByBrand);

module.exports = router;
