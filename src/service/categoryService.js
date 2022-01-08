const Category = require('../db/models/category');

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

    const updateCategoryDiscountTax = (categoryNameFilter, discountTaxToUpdate) => {
        let filter = { name: categoryNameFilter };
        let update = { discountTax: discountTaxToUpdate}
        // Set new to true to return the document after the update
        return Category.findOneAndUpdate(filter, update, {new: true});
    }

    const createCategory = (newCategoryName, newCategoryDiscountTax) => {
        let categoriesList = Category.find();
        return new Category({
            name: newCategoryName,
            discountTax: newCategoryDiscountTax
        });
    }
    
    return {
        getAllCategories,
        getOneCategory,
        deleteCategory,
        updateCategoryDiscountTax,
        createCategory
    }
})();

exports.CategoryServiceAPI = CategoryServiceAPI;