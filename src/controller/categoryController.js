const categoryService = require('../service/categoryService');
const responseFormatter = require('../utils/responseFormatter');

const CategoryAPI = (function singletonCategoryController() {

    const categoryFindAll = ((req, res, next) => {
        categoryService.CategoryServiceAPI.getAllCategories()
            .then((data) => {
                const response = responseFormatter(null, data, 'Request category findAll succesfull');
                res.status(200).type('json').json(response);
            }).catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const categoryFindOne = ((req, res, next) => {
        categoryService.CategoryServiceAPI.getOneCategory(req.params.key, req.params.value)
            .then((data) => {
                const response = responseFormatter(null, data, 'Request category findOne succesfull');
                res.status(200).type('json').json(response);
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const categoryDeleteOne = ((req, res, next) => {
        categoryService.CategoryServiceAPI.deleteCategory(req.params.key, req.params.value)
            .then((data) => {
                // Not sending body response when status code is 204 --> No Content
                data 
                ? res.status(204).send("Success!")
                : res.status(200).send("Category to delete not found");
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const categoryUpdateOne = ((req, res, next) => {
        categoryService.CategoryServiceAPI.updateCategoryDiscountTax(req.params.name, req.params.discountTax)
            .then((data) => {
                const response = data 
                ? responseFormatter(null, data, 'Request category updateOne succesfull')
                : responseFormatter(null, data, 'Requested category to update not found');
                res.status(202).type('json').json(response);
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const createCategory = ((req, res, next) => {
        categoryService.CategoryServiceAPI.createCategory(req.body)
        .then((data) => {
            const response = data 
            ? responseFormatter(null, data, 'Request create category succesfull')
            : responseFormatter(null, data, 'Category already exists !');
            res.status(202).type('json').json(response);
        })
        .catch((err) => {
            const response = responseFormatter(err);
            res.status(400).type('json').json(response);
        });
    });

    return {
        categoryFindAll,
        categoryFindOne,
        categoryDeleteOne,
        categoryUpdateOne,
        createCategory
    }
})();

exports.CategoryAPI = CategoryAPI;