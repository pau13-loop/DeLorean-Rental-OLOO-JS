var express = require('express');
var router = express.Router();

// CONTROLLER
var customerController = require('../controller/customer-controller');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//* CUSTOMER ROUTES *//
router.get('/', customerController.CustomerAPI.customerFindAll);
router.get('/:key/:value', customerController.CustomerAPI.customerFindOne);
router.delete('/delete/:key/:value', customerController.CustomerAPI.customerDeleteOne);
router.put('/update/:id', customerController.CustomerAPI.updateCustomer);
router.post('/create', customerController.CustomerAPI.createCustomer);

module.exports = router;