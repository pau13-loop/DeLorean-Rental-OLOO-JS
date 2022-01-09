const rentalService = require('../service/rentalService');
const responseFormatter = require('../utils/responseFormatter');

const rentalAPI = (function singletonRentalController() {

    const rentalFindAll = ((req, res, next) => {
        rentalService.RentalServiceAPI.getAllRentals()
            .then((data) => {
                const response = responseFormatter(null, data, 'Request rental findAll succesfull');
                console.log('Response: ', response);
                res.status(200).type('json').json(response);
            }).catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const rentalFindOne = ((req, res, next) => {
        rentalService.RentalServiceAPI.getOneRental(req.params.key, req.params.value)
            .then((data) => {
                const response = responseFormatter(null, data, 'Request booking findOne succesfull');
                res.status(200).type('json').json(response);
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const rentalDeleteOne = ((req, res, next) => {
        rentalService.RentalServiceAPI.deleteRental(req.params.key, req.params.value)
            .then((data) => {
                // Not sending body response when status code is 204 --> No Content
                data 
                ? res.status(204).send("Success!")
                : res.status(200).send("Rental to delete not found");
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const rentalCreate = ((req, res, next) => {
        rentalService.RentalServiceAPI.createRental(req.body)
        .then((data) => {
            const response = data
            ? responseFormatter(null, data, 'Request create rental succesfull')
            : responseFormatter(null, data, 'Requested to make a booking couldn\'t be make, check parametres specified please and try again !');
            res.status(202).type('json').json(response);
        })
        .catch((err) => {
            const response = responseFormatter(err);
            res.status(400).type('json').json(response);
        });
    });

    return {
        rentalFindAll,
        rentalFindOne,
        rentalDeleteOne,
        rentalCreate
    }
})();

exports.rentalAPI = rentalAPI;