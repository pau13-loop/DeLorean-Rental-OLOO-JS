var express = require('express');
var router = express.Router();

// CONTROLLER
var vehicleController = require('../db/controller/vehicleController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//* CATEGORY ROUTES *//
router.get('/', vehicleController.vehicleAPI.vehicleFindAll);
router.get('/:model', vehicleController.vehicleAPI.vehiclesFindOne);
router.get('/delete/:model', vehicleController.vehicleAPI.vehicleDeleteOne);
// Business logic 
router.get('/update/price', vehicleController.vehicleAPI.updatePrice);

module.exports = router;