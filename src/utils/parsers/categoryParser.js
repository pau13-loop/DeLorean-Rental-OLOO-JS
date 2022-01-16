const CategoryProto = require('../../domain/category/category');

const CategoryParser = (function singletonCategoryParser() {
    const categoryDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                let parsedData = [];
                //TODO: forEach
                data.forEach(category => {
                    let parsedCategory = getCategoryParsed(category);
                    //TODO: Structuring
                    parsedData = [...parsedData, parsedCategory];
                });
                return parsedData;
            }
            return getCategoryParsed(data);
        }
        return null;
    };

    const getCategoryParsed = (data) => {
        return {
            id: data._id,
            name: data.name,
            discountTax: data.discountTax
        };
    };

    return {
        categoryDataParser
    };
})();

exports.CategoryParser = CategoryParser;