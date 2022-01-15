const BookingParser = (function singletonBookingParser() {

    const bookingDataParser = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(booking => {
                    return getBookingParsed(booking);
                });
            }
            return getBookingParsed(data);
        }
        return null;
    };

    const getBookingParsed = (data) => {
        return {
            id: data._id,
            startDate: data.startDate,
            endDate: data.endDate,
            customer: data.customer,
            vehicle: data.vehicle
        };
    };

    return {
        bookingDataParser
    };
})();

exports.BookingParser = BookingParser;