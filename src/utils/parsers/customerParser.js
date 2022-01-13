const customerParser = (function singletonCustomerParser() {

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

    return {
        customerDataParser
    };
})();

exports.customerParser = customerParser;