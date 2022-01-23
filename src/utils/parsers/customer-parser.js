const CustomerParser = (function singletonCustomerParser() {
    //! Private
    const _getCustomerParsed = (data) => {
        return {
            id: data._id,
            name: data.name,
            lastName: data.lastName,
            birthDate: new Date(data.birthDate).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" }),
            dniNumber: data.dniNumber,
            dniLetter: data.dniLetter
        };
    };

    const customerDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(customer => {
                    return _getCustomerParsed(customer);
                });
            }
            return _getCustomerParsed(data);
        }
        return null;
    }

    return {
        customerDataParser
    };
})();

exports.CustomerParser = CustomerParser;