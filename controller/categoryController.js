const categoryService = require('../service/categoryService');

const categoryAPI = (function singletonCategoryController() {

    const categoryFindAll = ((req, res, next) => {
        let response = categoryService.CategoryServiceAPI.getAllCategories();
        console.log('Find all: ', response);
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
        categoryUpdateOne
    }
})();

exports.categoryAPI = categoryAPI;