const categoryDataParser = (data) => {
    console.log(data);
    if (data) {
        if (data.length > 0) {
            var parsedData = [];
            //TODO: forEach
            data.forEach(category => {
                let parsedCategory = {
                    id: category._id,
                    name: category.name,
                    discountTax: category.discountTax
                };
                //TODO: Structuring
                parsedData = [...parsedData, parsedCategory];
            });
            return parsedData;
        }
        return {
            id: data._id,
            name: data.name,
            discountTax: data.discountTax
        }
    }
    return null;
}

module.exports = categoryDataParser;