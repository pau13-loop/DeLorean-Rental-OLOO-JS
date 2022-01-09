const ObjectParsers = (function singletonObjectParsers() {

    const categoryDataParser = (data) => {
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

    const vehicleDataParser = (data) => {
        console.log(data);
        if (data) {
            if (data.length > 0) {
                //TODO: Map
                let vehiclesList = data.map(vehicle => {
                    return {
                        model: vehicle.model,
                        brand: vehicle.brand,
                        category: vehicle.category,
                        passengers: vehicle.passengers,
                        year: vehicle.year,
                        price: vehicle.price,
                        available: vehicle.available
                    };
                });
                //TODO: Set
                return [...new Set(vehiclesList)];
            }
            return {
                id: data._id,
                model: data.model,
                brand: data.brand,
                category: data.category,
                passengers: data.passengers,
                year: data.year,
                price: data.price,
                available: data.available
            }
        }
        return null;
    }

    return {
        categoryDataParser,
        vehicleDataParser
    }
})();

exports.ObjectParsers = ObjectParsers;