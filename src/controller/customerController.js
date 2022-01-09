const customerService = require('../service/customerService');
const responseFormatter = require('../utils/responseFormatter');

const CustomerAPI = (function singletonCustomerController() {

    const customerFindAll = ((req, res, next) => {
        customerService.CustomerServiceAPI.getAllCustomers()
            .then((data) => {
                const response = responseFormatter(null, data, 'Request customer findAll succesfull');
                console.log('Response: ', response);
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

    return {
        customerFindAll,
        customerFindOne,
        customerDeleteOne
    }
})();

exports.CustomerAPI = CustomerAPI;