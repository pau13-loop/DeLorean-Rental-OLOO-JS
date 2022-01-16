var Vehicle = {
    init: function (
        model, brand, category, year, price, ORIGINAL_PRICE, available) {
        this.model = model;
        this.brand = brand;
        this.category = category;
        // this.passengers = passengers;
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
        return this.ORIGINALPRICE;
    },
    getMinPrice: function () {
        return this.ORIGINALPRICE - (this.ORIGINALPRICE * 0.4);
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
            ? Object.setPrototypeOf(vehicle, Vehicle.init(vehicle.model, vehicle.brand, vehicle.category, vehicle.passengers, vehicle.year, vehicle.price, vehicle.isAvailable))
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
    //! Añadir método para eliminar los vehiculos que cumplan la condición de tener más de cinco años 
    updatePrice: function () {
        if (this.category.name !== 'classic') {
            const actualYear = new Date().getFullYear();
            let updatePercentatge = 0.1 * (actualYear - this.year);
            //? Conseguimos el nuevo precio multiplicando el porcentaje por el precio original, porque el precio podría ya tener un descuento aplicado, y el descuento del 10% por año siempre se realizará sobre el precio original
            //* Al actualizar el precio queremos redondearlo
            let newPrice = Math.round(this.ORIGINALPRICE - this.ORIGINALPRICE * updatePercentatge);
            if (newPrice > this.getMinPrice()) {
                this.price = newPrice;
            }
            else {
                this.price = this.getMinPrice();
            }
        }
    }
};

module.exports = Vehicle;