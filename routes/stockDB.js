var express = require('express');
var router = express.Router();

// Controller modules 
var stockController = require('../controller/stockControllerDB');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

router.get('/', stockController.stockAPI.stockList);

module.exports = router;