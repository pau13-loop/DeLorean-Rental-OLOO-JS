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
router.get('/', vehicleController.VehicleAPI.vehiclesFindAll);
router.get('/:key/:value', vehicleController.VehicleAPI.vehiclesFindOne);
router.get('/available', vehicleController.VehicleAPI.vehiclesFindAvailables);
router.delete('/delete/:key/:value', vehicleController.VehicleAPI.vehicleDeleteOne);
router.post('/create', vehicleController.VehicleAPI.createVehicle);
router.put('/update/:id', vehicleController.VehicleAPI.updateVehicle);

module.exports = router;