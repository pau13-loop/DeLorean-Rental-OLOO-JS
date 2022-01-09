const bookingService = require('../service/bookingService');
const responseFormatter = require('../utils/responseFormatter');

const bookingAPI = (function singletonBookingController() {

    const bookingFindAll = ((req, res, next) => {
        bookingService.BookingServiceAPI.getAllBookings()
            .then((data) => {
                const response = responseFormatter(null, data, 'Request booking findAll succesfull');
                console.log('Response: ', response);
                res.status(200).type('json').json(response);
            }).catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const bookingFindOne = ((req, res, next) => {
        bookingService.BookingServiceAPI.getOneBooking(req.params.key, req.params.value)
            .then((data) => {
                const response = responseFormatter(null, data, 'Request booking findOne succesfull');
                res.status(200).type('json').json(response);
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const bookingDeleteOne = ((req, res, next) => {
        bookingService.BookingServiceAPI.deleteBooking(req.params.key, req.params.value)
            .then((data) => {
                // Not sending body response when status code is 204 --> No Content
                data 
                ? res.status(204).send("Success!")
                : res.status(200).send("Booking to delete not found");
            })
            .catch((err) => {
                const response = responseFormatter(err);
                res.status(400).type('json').json(response);
            });
    });

    const bookingCreate = ((req, res, next) => {
        bookingService.BookingServiceAPI.createBooking(req.body)
        .then((data) => {
            const response = data
            ? responseFormatter(null, data, 'Request create booking succesfull')
            : responseFormatter(null, data, 'Requested to make a booking couldn\'t be make, check parametres specified please and try again !');
            res.status(202).type('json').json(response);
        })
        .catch((err) => {
            const response = responseFormatter(err);
            res.status(400).type('json').json(response);
        });
    });

    return {
        bookingFindAll,
        bookingFindOne,
        bookingDeleteOne,
        bookingCreate
    }
})();

exports.bookingAPI = bookingAPI;