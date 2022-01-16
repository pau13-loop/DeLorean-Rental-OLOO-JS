
var Booking = {
    _init: function (startDate, endDate, customer, vehicle) {
        this.startDate = startDate; // format YYYY/MM/DD
        this.endDate = endDate; // format YYYY/MM/DD
        this.customer = customer;
        this.vehicle = vehicle;
        return this;
    },
    getStartDate: function () {
        return this.startDate;
    },
    getEndDate: function () {
        return this.endDate;
    },
    getCustomer: function () {
        return this.customer;
    },
    getVehicle: function () {
        return this.vehicle;
    },
    setPrototypeBooking: function(booking) {
        return Object.getPrototypeOf(booking) != Booking 
        ?  Object.setPrototypeOf(booking, Booking._init(booking.startDate, booking.endDate, booking.customer, booking.vehicle))
        : booking;
    },
    calculateBookingDaysNum: function () {
        var regexFormatDate = /^(([0-9]{4})\/[0-9]{2})\/([0-9]{2})$/;
        if (regexFormatDate.test(this.startDate) && regexFormatDate.test(this.endDate) && new Date(this.endDate) > new Date(this.startDate)) {
            var differenceBtwDates = new Date(this.endDate).getTime() - new Date(this.startDate).getTime();
            //* Plus one at the end to add the day that the booking starts
            return Math.ceil(differenceBtwDates / (1000 * 3600 * 24)) + 1;
        }
        return null;
    },
    calculatePriceBooking: function () {
        let totalBookingDays = this.calculateBookingDaysNum();
        return totalBookingDays 
        ? totalBookingDays * this.vehicle.price 
        : null;
    }
}

module.exports = Booking;