const CustomerParser = (function singletonCustomerParser() {

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

    const _getCustomerParsed = (data) => {
        return {
            id: data._id,
            name: data.name,
            lastName: data.lastName,
            birthDate: new Date(data.birthDate).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ,
            dniNumber: data.dniNumber,
            dniLetter: data.dniLetter
        };
    };

    return {
        customerDataParser
    };
})();

exports.CustomerParser = CustomerParser;