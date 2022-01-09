const categoryService = require('../service/categoryService');
const responseFormatter = require('../utils/responseFormatter');

const CategoryAPI = (function singletonCategoryController() {

    const categoryFindAll = ((req, res, next) => {
        categoryService.CategoryServiceAPI.getAllCategories()
            .then((data) => {
                const response = responseFormatter(null, data, 'Request category findAll succesfull');
                console.log('Response: ', response);
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

    //! REFACTOR
    const createCategory = ((req, res, next) => {
        // let response = categoryService.CategoryServiceAPI.createCategory(req.params.name, req.params.discountTax);
        // response.save(function (err) {
        //     if (err) {
        //         res.status(400).send('Sorry unable to create the category');
        //         return next(err)
        //     }
        //     console.log('Document created successfully !');
        //     res.status(201).type('json').json(response);
        // });
        // console.log('Request: ', req);
        // console.log('Request: ', req.body);
        // console.log('Controller: ', req.body);
        // categoryService.CategoryServiceAPI.createCategory(req.body);
        res.send('Success !');
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