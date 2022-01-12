var express = require('express');
var router = express.Router();

// CONTROLLER
var BookingController = require('../controller/bookingController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//* CUSTOMER ROUTES *//
router.get('/', BookingController.bookingAPI.bookingFindAll);
router.get('/:key/:value', BookingController.bookingAPI.bookingFindOne);
// router.get('/price', );
router.delete('/delete/:key/:value', BookingController.bookingAPI.bookingDeleteOne);
router.post('/create', BookingController.bookingAPI.bookingCreate); //! Mejorar creación booking

module.exports = router;