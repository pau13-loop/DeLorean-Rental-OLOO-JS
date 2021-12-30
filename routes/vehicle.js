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
router.get('/', vehicleController.vehicleAPI.vehicleFindAll);

module.exports = router;