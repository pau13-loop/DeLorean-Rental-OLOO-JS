const Category = require('../db/models/category');
const CategoryParser = require('../utils/parsers/category-parser');

const CategoryServiceAPI = (function singletonCategoryService() {

    const getAllCategories = () => {
        return Category.find().then(CategoryParser.CategoryParser.categoryDataParser);
    }

    const getOneCategory = (key, value) => {
        return (key === 'id'
            ? Category.findById(value)
            : Category.findOne({ [key]: value }))
            .exec()
            .then(CategoryParser.CategoryParser.categoryDataParser);
    }

    const deleteCategory = (key, value) => {
        return (key === 'id'
            ? Category.findByIdAndDelete(value)
            : Category.findOneAndDelete({ [key]: value }))
            .exec()
            .then(CategoryParser.CategoryParser.categoryDataParser);
    }

    const updateCategoryDiscountTax = (categoryNameFilter, discountTaxToUpdate) => {
        let filter = { name: categoryNameFilter };
        let update = { discountTax: discountTaxToUpdate }
        // Set new to true to return the document after the update
        return Category.findOneAndUpdate(filter, update, { new: true })
            .exec()
            .then(CategoryParser.CategoryParser.categoryDataParser);
    }

    const createCategory = async (data) => {
        let categoriesList = await Category.find();
        if (!categoriesList.find(category => category.name === data.name)) {
            let newCategory = new Category({
                name: data.name,
                discountTax: data.discountTax
            });
            return newCategory.save().then(CategoryParser.CategoryParser.categoryDataParser);
        }
        return null;
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