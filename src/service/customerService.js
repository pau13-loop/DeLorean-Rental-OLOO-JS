const Customer = require('../db/models/customer');
const objectParsers = require('../utils/objectParsers');

const CustomerServiceAPI = (function singletonCustomerService() {

    const getAllCustomers = () => {
        return Customer.find().then(objectParsers.ObjectParsers.customerDataParser);
    };

    const getOneCustomer = (key, value) => {
        return (key === 'id'
            ? Customer.findById(value)
            : Customer.findOne({ [key]: value }))
            .exec()
            .then(objectParsers.ObjectParsers.customerDataParser);
    };

    const deleteCustomer = (key, value) => {
        return (key === 'id'
            ? Customer.findByIdAndDelete(value)
            : Customer.findOneAndDelete({ [key]: value }))
            .exec()
            .then(objectParsers.ObjectParsers.customerDataParser);
    };

    const createCustomer = (data) => {
        let newCustomer = new Customer({
            name: data.name,
            lastName: data.lastName,
            birthDate: data.birthDate,
            dniNumber: data.dniNumber,
            dniLetter: data.dniLetter
        });
        return newCustomer.save().then(objectParsers.ObjectParsers.customerDataParser);
    }

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
            .then(objectParsers.ObjectParsers.customerDataParser);
    }

    return {
        getAllCustomers,
        getOneCustomer,
        deleteCustomer,
        createCustomer,
        updateCustomer
    }
})();

exports.CustomerServiceAPI = CustomerServiceAPI;