
var Booking = {
    init: function (startDate, endDate, customer, vehicle) {
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
        ?  Object.setPrototypeOf(booking, Booking.init(booking.startDate, booking.endDate, booking.customer, booking.vehicle))
        : booking;
    },
    calculateBookingDaysNum: function () {
        var regexFormatDate = /^(([0-9]{4})\/[0-9]{2})\/([0-9]{2})$/;
        if (regexFormatDate.test(this.startDate) && regexFormatDate.test(this.endDate) && new Date(this.endDate) > new Date(this.startDate)) {
            var differenceBtwDates = new Date(this.endDate).getTime() - new Date(this.startDate).getTime();
            //* Le sumamos uno al final para que incluya el día de inicio del booking
            return Math.ceil(differenceBtwDates / (1000 * 3600 * 24)) + 1;
        }
        return null;
    },
    //! Si se tienenq ue aplicar algún descuento deberían ejecutarse antes los métodos para aplicar un descuento sobre el precio y calcular el precio ya sobre el valor del coche con el descuento aplicado sobre él
    calculatePriceBooking: function () {
        let totalBookingDays = this.calculateBookingDaysNum();
        return totalBookingDays 
        ? totalBookingDays * this.vehicle.price 
        : null;
    }
}

module.exports = Booking;