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
router.get('/', customerController.CustomerAPI.customerFindAll);
router.get('/:key/:value', customerController.CustomerAPI.customerFindOne);
router.delete('/delete/:key/:value', customerController.CustomerAPI.customerDeleteOne);
router.post('/create', customerController.CustomerAPI.createCustomer); //! Aplicar validaciones
router.put('/update/:id', customerController.CustomerAPI.updateCustomer);

module.exports = router;