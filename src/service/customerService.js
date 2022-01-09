const Customer = require('../db/models/customer');
const objectParsers = require('../utils/objectParsers');

const CustomerServiceAPI = (function singletonCustomerService() {

    const getAllCustomers = () => {
        return Customer.find().then(objectParsers.ObjectParsers.customerDataParser);
    };

    const getOneCustomer = (key, value) => {
        return (key === 'id' 
        ? Customer.findById(value)
        : Customer.findOne({[key]: value}))
        .exec()
        .then(objectParsers.ObjectParsers.customerDataParser);
    };

    const deleteCustomer = (key, value) => {
        return (key === 'id' 
        ? Customer.findByIdAndDelete(value)
        : Customer.findOneAndDelete({[key]: value}))
        .exec()
        .then(objectParsers.ObjectParsers.customerDataParser);
    };

    return {
        getAllCustomers,
        getOneCustomer,
        deleteCustomer
    }   
})();

exports.CustomerServiceAPI = CustomerServiceAPI;