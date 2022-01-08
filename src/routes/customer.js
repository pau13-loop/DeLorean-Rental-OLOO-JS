var express = require('express');
var router = express.Router();

// CONTROLLER
var customerController = require('../controller/customerController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//* CUSTOMER ROUTES *//
router.get('/', customerController.customerAPI.customerFindAll);
router.get('/:name', customerController.customerAPI.customerFindOne);

module.exports = router;