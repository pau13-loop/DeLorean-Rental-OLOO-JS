var express = require('express');
var router = express.Router();

// CONTROLLER
var vehicleController = require('../controller/vehicle-controller');

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
//? Added /stock to endpoint to not get conflict with the update endpoint by :id
router.put('/update/stock/price', vehicleController.VehicleAPI.updatePriceVehicles);
router.put('/update/stock/discount', vehicleController.VehicleAPI.applyDiscountTaxVehicles);

module.exports = router;