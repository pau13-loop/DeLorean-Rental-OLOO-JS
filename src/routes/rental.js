var express = require('express');
var router = express.Router();

// CONTROLLER
var RentalController = require('../controller/rentalController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//* CUSTOMER ROUTES *//
router.get('/', RentalController.rentalAPI.rentalFindAll);
router.get('/:key/:value', RentalController.rentalAPI.rentalFindOne);
router.delete('/delete/:key/:value', RentalController.rentalAPI.rentalDeleteOne);

module.exports = router;