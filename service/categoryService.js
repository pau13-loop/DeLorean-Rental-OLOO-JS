const Category = require('../models/category');

const CategoryServiceAPI = (function singletonCategoryService() {

    const getAllCategories = () => {
        return Category.find();
    }

    const getOneCategory = (categoryName) => {
        return Category.findOne({name: categoryName});
    }

    const deleteCategory = (categoryName) => {
        return Category.findOneAndDelete({name: categoryName});
    }

    const updateCategory = (categoryNameFilter, discountTaxToUpdate) => {
        let filter = { name: categoryNameFilter };
        let update = { discountTax: discountTaxToUpdate}
        // Set new to true to return the document after the update
        return Category.findOneAndUpdate(filter, update, {new: true});
    }
    
    return {
        getAllCategories,
        getOneCategory,
        deleteCategory,
        updateCategory
    }
})();

exports.CategoryServiceAPI = CategoryServiceAPI;