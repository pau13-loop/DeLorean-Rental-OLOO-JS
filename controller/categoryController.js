const categoryService = require('../service/categoryService');

const categoryAPI = (function singletonCategoryController() {

    const categoryFindAll = ((req, res, next) => {
        let response = categoryService.CategoryServiceAPI.getAllCategories();
        responseChecker(res, next, response);
    });

    const categoryFindOne = ((req, res, next) => {
        let response = categoryService.CategoryServiceAPI.getOneCategory(req.params.name);
        responseChecker(res, next, response);
    });

    const categoryDeleteOne = ((req, res, next) => {
        let response = categoryService.CategoryServiceAPI.deleteCategory(req.params.name);
        responseChecker(res, next, response);
    });

    const categoryUpdateOne = ((req, res, next) => {
        let response = categoryService.CategoryServiceAPI.updateCategory(req.params.name, req.params.discountTax);
        responseChecker(res, next, response);
    });

    const createCategory =((req, res, next) => {
        let response = categoryService.CategoryServiceAPI.createCategory(req.params.name, req.params.discountTax);
        response.save(function (err) {
            if (err) {
                //? Status code error 400 vs 500
                res.status(500).send('Sorry unable to create the category');
                return next(err)
            }
            console.log('Document created successfully !');
            res.status(201).type('json').json(response);
        });
    });

    const responseChecker = ((res, next, object) => {
        object.exec(function (err, result) {
            if (err) {
                return next(err);
            }
            res.status(200).type('json').json(result);
        })
    });

    return {
        categoryFindAll,
        categoryFindOne,
        categoryDeleteOne,
        categoryUpdateOne,
        createCategory
    }
})();

exports.categoryAPI = categoryAPI;