var express = require('express');
var router = express.Router();

// CONTROLLER
var categoryController = require('../controller/categoryController');

// ROUTER LEVEL MIDDLEWARE
router.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.body);
    next();
});

//* CATEGORY ROUTES *//
router.get('/', categoryController.categoryAPI.categoryFindAll);
router.get('/:name', categoryController.categoryAPI.categoryFindOne);
router.get('/delete/:name', categoryController.categoryAPI.categoryDeleteOne);
router.get('/update/:name/:discountTax', categoryController.categoryAPI.categoryUpdateOne)
router.get('/create/:name/:discountTax', categoryController.categoryAPI.createCategory);

module.exports = router;