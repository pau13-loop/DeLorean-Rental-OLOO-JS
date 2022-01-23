const CategoryProto = require('../../domain/category/category');

const CategoryParser = (function singletonCategoryParser() {
    //! Private
    const _getCategoryParsed = (data) => {
        return {
            id: data._id,
            name: data.name,
            discountTax: data.discountTax
        };
    };

    const categoryDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                let parsedData = [];
                //TODO: forEach
                data.forEach(category => {
                    let parsedCategory = _getCategoryParsed(category);
                    //TODO: Structuring
                    parsedData = [...parsedData, parsedCategory];
                });
                return parsedData;
            }
            return _getCategoryParsed(data);
        }
        return null;
    };

    return {
        categoryDataParser
    };
})();

exports.CategoryParser = CategoryParser;