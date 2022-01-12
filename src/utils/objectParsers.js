const ObjectParsers = (function singletonObjectParsers() {

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

    const vehicleDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                //TODO: Map
                return data.map(vehicle => {
                    return getVehicleParsed(vehicle);
                });
            }
            return getVehicleParsed(data);
        }
        return null;
    };

    const getVehicleParsed = (data) => {
        return {
            id: data._id,
            model: data.model,
            brand: data.brand,
            category: data.category,
            passengers: data.passengers,
            year: data.year,
            price: data.price,
            originalPrice: data.orginalPrice,
            available: data.available
        };
    };

    const customerDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(customer => {
                    return getCustomerParsed(customer);
                });
            }
            return getCustomerParsed(data);
        }
        return null;
    }

    const getCustomerParsed = (data) => {
        return {
            id: data._id,
            name: data.name,
            lastName: data.lastName,
            birthDate: data.birthDate,
            dniNumber: data.dniNumber,
            dniLetter: data.dniLetter
        };
    };

    const bookingDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(booking => {
                    return getBookingParsed(booking);
                });
            }
            return getBookingParsed(data);
        }
        return null;
    };

    const getBookingParsed = (data) => {
        return {
            id: data._id,
            startDate: data.startDate,
            endDate: data.endDate,
            customer: data.customer,
            vehicle: data.vehicle
        };
    };

    return {
        categoryDataParser,
        vehicleDataParser,
        customerDataParser,
        bookingDataParser
    };
})();

exports.ObjectParsers = ObjectParsers;