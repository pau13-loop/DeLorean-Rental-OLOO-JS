const BookingParser = (function singletonBookingParser() {
    //! Private
    const _getBookingParsed = (data) => {
        return {
            id: data._id,
            startDate: data.startDate,
            endDate: data.endDate,
            customer: data.customer,
            vehicle: data.vehicle
        };
    };

    const bookingDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(booking => {
                    return _getBookingParsed(booking);
                });
            }
            return _getBookingParsed(data);
        }
        return null;
    };

    return {
        bookingDataParser
    };
})();

exports.BookingParser = BookingParser;