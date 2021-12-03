var Vehicle = {
    init: function (
        brand, model, category, passengers, year, price, available) {
        this.model = model;
        this.brand = brand;
        this.category = category;
        this.passengers = passengers;
        this.year = year;
        this.price = price;
        this.available = available;
        return this;
    },
    getBrand: function () {
        return this.brand;
    },
    getModel: function () {
        return this.model;
    },
    getCategory: function () {
        return this.category;
    },
    getPrice: function () {
        return this.price;
    },
    getYear: function() {
        return this.year;
    },
    getAvailability: function() {
        return this.available;
    },
    getOriginalPrice: function () {
        return this.ORIGINALPRICE;
    },
    getName: function () {
        return `Vehicle name: ${this.brand} ${this.model}`;
    },
    getDiscountedPrice: function () {
        return `Discount applied successfully! \nPrice: ${this.price}`;
    },
    getMinPrice: function() {
        return this.ORIGINALPRICE * 0.3;
    },
    //TODO: Object.defineProperty()
    setPrototypeVehicle: function (vehicle) {
        if (Object.getPrototypeOf(vehicle) !== Vehicle) {
            let newVehicle = Object.setPrototypeOf(vehicle, Vehicle.init(vehicle.brand, vehicle.model, vehicle.category, vehicle.passengers, vehicle.year, vehicle.price, vehicle.available));
            Object.defineProperty(newVehicle, "ORIGINALPRICE", {
                value: newVehicle.price,
                writeable: false,
                enumerable: false,
                configurable: false
            });
            return vehicle;
        }
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
    //! para chequear si son clásicos, aquí o en el service ???
    updatePrice: function () {
        const actualYear = new Date().getFullYear();
        let updatePercentatge = 0.1 * (actualYear - this.year);
        //* Al actualizar el precio queremos redondearlo
        //? Conseguimos el nuevo precio multiplicando el porcentaje por el precio original, porque el precio podría ya tener un descuento aplicdo, y el descuento del 10% por año siempre se realizará sobre el precio original
        let newPrice = Math.round(this.ORIGINALPRICE * updatePercentatge);

        if (newPrice > this.getMinPrice()) {
            this.price = newPrice; 
        }
        else {
            this.price = this.getMinPrice(); 
        }
    }
};

module.exports = Vehicle;