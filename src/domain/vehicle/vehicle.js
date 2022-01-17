var Vehicle = {
    _init: function (
        model, brand, category, year, price, ORIGINAL_PRICE, isAvailable) {
        this.model = model;
        this.brand = brand;
        this.category = category;
        this.year = year;
        this.price = price;
        this.ORIGINAL_PRICE = ORIGINAL_PRICE;
        this.isAvailable = isAvailable;
        return this;
    },
    // Prop getters
    getModel: function () {
        return this.model;
    },
    getBrand: function () {
        return this.brand;
    },
    getCategory: function () {
        return this.category;
    },
    getPassengers: function () {
        return this.passengers;
    },
    getYear: function () {
        return this.year;
    },
    getPrice: function () {
        return this.price;
    },
    getIsAvailable: function () {
        return this.isAvailable;
    },
    getName: function () {
        return `Vehicle name: ${this.brand} ${this.model}`;
    },
    getOriginalPrice: function () {
        return this.ORIGINAL_PRICE;
    },
    getMinPrice: function () {
        return this.ORIGINAL_PRICE - (this.ORIGINAL_PRICE * 0.4);
    },
    bookVehicle: function () {
        this.isAvailable = false;
    },
    finishBookingVehicle: function () {
        this.isAvailable = true;
    },
    //TODO: Object.defineProperty()
    setPrototypeVehicle: function (vehicle) {
        return Object.getPrototypeOf(vehicle) !== Vehicle
            ? Object.setPrototypeOf(vehicle, Vehicle._init(vehicle.model, vehicle.brand, vehicle.category, vehicle.passengers, vehicle.year, vehicle.price, vehicle.isAvailable))
            : vehicle;
    },
    //TODO: closure
    getPresonalAssistance: function (subject) {
        let closure = function (name) {
            function notifyAssistance() {
                return `Assitance notified, please remain at your location ${name}`
            }
            return notifyAssistance;
        }
        Object.defineProperty(Vehicle, "personalAssistance", {
            value: closure(subject)
        });
    },
    updatePrice: function () {
        if (this.category.name !== 'classic') {
            const actualYear = new Date(Date.now()).getFullYear();
            let updatePercentatge = 0.1 * (actualYear - this.year);
            //* When we update the price we want to round it to the nearest integer
            let updatedPrice = Math.round(this.ORIGINAL_PRICE - this.ORIGINAL_PRICE * updatePercentatge);
            if (updatedPrice > this.getMinPrice()) {
                this.price = updatedPrice;
            }
            else {
                this.price = this.getMinPrice();
            }
        }
    }
};

module.exports = Vehicle;