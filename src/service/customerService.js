const Customer = require('../db/models/customer');
const CustomerProto = require('../domain/customer/customer');
const CustomerParser = require('../utils/parsers/customer-parser');

const CustomerServiceAPI = (function singletonCustomerService() {

    const getAllCustomers = () => {
        return Customer.find().then(CustomerParser.CustomerParser.customerDataParser);
    };

    const getOneCustomer = (key, value) => {
        return (key === 'id'
            ? Customer.findById(value)
            : Customer.findOne({ [key]: value }))
            .exec()
            .then(CustomerParser.CustomerParser.customerDataParser);
    };

    const deleteCustomer = (key, value) => {
        return (key === 'id'
            ? Customer.findByIdAndDelete(value)
            : Customer.findOneAndDelete({ [key]: value }))
            .exec()
            .then(CustomerParser.CustomerParser.customerDataParser);
    };

    const updateCustomer = (id, data) => {
        let update = {
            name: data.name,
            lastName: data.lastName,
            birthDate: data.birthDate,
            dniNumber: data.dniNumber,
            dniLetter: data.dniLetter
        }
        // Set new to true to return the document after the update
        return Customer.findByIdAndUpdate(id, update, { new: true })
            .exec()
            .then(CustomerParser.CustomerParser.customerDataParser);
    }

    const createCustomer = (data) => {
        let custProto = CustomerProto.setPrototypeCustomer(data);
        if (custProto.checkValidDni()) {
            let newCustomer = new Customer({
                name: data.name,
                lastName: data.lastName,
                birthDate: data.birthDate,
                dniNumber: data.dniNumber,
                dniLetter: data.dniLetter
            });
            return newCustomer.save().then(CustomerParser.CustomerParser.customerDataParser);
        }
        return Promise.resolve(null);
    }

    return {
        getAllCustomers,
        getOneCustomer,
        deleteCustomer,
        updateCustomer,
        createCustomer
    }
})();

exports.CustomerServiceAPI = CustomerServiceAPI;