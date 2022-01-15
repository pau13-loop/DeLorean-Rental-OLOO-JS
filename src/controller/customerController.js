const customerService = require('../service/customerService');
const responseFormatter = require('../utils/responseFormatter');

const CustomerAPI = (function singletonCustomerController() {

    const customerFindAll = ((req, res, next) => {
        customerService.CustomerServiceAPI.getAllCustomers()
            .then((data) => {
                const response = responseFormatter(null, data, 'Request customer findAll succesfull');
                res.status(200).type('json').json(response);
            }).catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const customerFindOne = ((req, res, next) => {
        customerService.CustomerServiceAPI.getOneCustomer(req.params.key, req.params.value)
            .then((data) => {
                const response = responseFormatter(null, data, 'Request customer findOne succesfull');
                res.status(200).type('json').json(response);
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const customerDeleteOne = ((req, res, next) => {
        customerService.CustomerServiceAPI.deleteCustomer(req.params.key, req.params.value)
            .then((data) => {
                // Not sending body response when status code is 204 --> No Content
                data
                    ? res.status(204).send("Success!")
                    : res.status(200).send("Customer to delete not found");
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const updateCustomer = ((req, res, next) => {
        customerService.CustomerServiceAPI.updateCustomer(req.params.id, req.body)
            .then((data) => {
                const response = data
                    ? responseFormatter(null, data, 'Request customer updated succesfully')
                    : responseFormatter(null, data, 'Requested customer to update not found');
                res.status(202).type('json').json(response);
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const createCustomer = ((req, res, next) => {
        customerService.CustomerServiceAPI.createCustomer(req.body)
            .then((data) => {
                console.log('data: ', data)
                const response = data
                    ? responseFormatter(null, data, 'Request create customer succesfull')
                    : responseFormatter(null, data, 'Couldn\'t create customer, please check the given parameters');
                res.status(202).type('json').json(response);
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    return {
        customerFindAll,
        customerFindOne,
        customerDeleteOne,
        updateCustomer,
        createCustomer
    }
})();

exports.CustomerAPI = CustomerAPI;