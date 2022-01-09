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
router.get('/', categoryController.CategoryAPI.categoryFindAll);
router.get('/:key/:value', categoryController.CategoryAPI.categoryFindOne);
router.delete('/delete/:key/:value', categoryController.CategoryAPI.categoryDeleteOne);
router.put('/update/:name/:discountTax', categoryController.CategoryAPI.categoryUpdateOne);
router.post('/create', categoryController.CategoryAPI.createCategory);

module.exports = router;