const Category = require('../db/models/category');
const objectParsers = require('../utils/objectParsers');

const CategoryServiceAPI = (function singletonCategoryService() {

    const getAllCategories = () => {
        return Category.find().then(objectParsers.ObjectParsers.categoryDataParser);
    }

    const getOneCategory = (key, value) => {
        return (key === 'id'
            ? Category.findById(value)
            : Category.findOne({ [key]: value }))
            .exec()
            .then(objectParsers.ObjectParsers.categoryDataParser);
    }

    const deleteCategory = (key, value) => {
        return (key === 'id' 
            ? Category.findByIdAndDelete(value)
            : Category.findOneAndDelete({[key]: value}))
            .exec()
            .then(objectParsers.ObjectParsers.categoryDataParser);
    }

    const updateCategoryDiscountTax = (categoryNameFilter, discountTaxToUpdate) => {
        let filter = { name: categoryNameFilter };
        let update = { discountTax: discountTaxToUpdate }
        // Set new to true to return the document after the update
        return Category.findOneAndUpdate(filter, update, { new: true })
            .exec()
            .then(objectParsers.ObjectParsers.categoryDataParser);
    }

    //! REFACTOR
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