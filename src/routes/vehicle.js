var express = require('express');
var router = express.Router();

// CONTROLLER
var vehicleController = require('../controller/vehicleController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//* CATEGORY ROUTES *//
router.get('/', vehicleController.VehicleAPI.vehicleFindAll);
router.get('/:key/:value', vehicleController.VehicleAPI.vehiclesFindOne);
router.delete('/delete/:key/:value', vehicleController.VehicleAPI.vehicleDeleteOne);
// Business logic 
router.put('/update/price', vehicleController.VehicleAPI.updatePrice);

module.exports = router;