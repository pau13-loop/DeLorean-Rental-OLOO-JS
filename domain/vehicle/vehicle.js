var Vehicle = {
    init: function (
        model, brand, category, passengers, year, price, available) {
        this.model = model;
        this.brand = brand;
        this.category = category;
        this.passengers = passengers;
        this.year = year;
        this.price = price;
        this.available = available;
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
    getPassengers: function() {
        return this.passengers;
    },
    getYear: function() {
        return this.year;
    },
    getPrice: function () {
        return this.price;
    },
    getAvailable: function() {
        return this.available;
    },
    getName: function () {
        return `Vehicle name: ${this.brand} ${this.model}`;
    },
    // Other necessary getters
    getOriginalPrice: function () {
        return this.ORIGINALPRICE;
    },
    getMinPrice: function() {
        return this.ORIGINALPRICE * 0.4;
    },
    //TODO: Object.defineProperty()
    setPrototypeVehicle: function (vehicle) {
        if (Object.getPrototypeOf(vehicle) !== Vehicle) {
            let newVehicle = Object.setPrototypeOf(vehicle, Vehicle.init(vehicle.model, vehicle.brand, vehicle.category, vehicle.passengers, vehicle.year, vehicle.price, vehicle.available));
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
    //! Esta función se debería poder llamar únicamente cuando el vehiculo este reservado ???
    //! Implementar en el caso de que se añada el proto general de Vehiculo y los determinado de coche, moto, ...
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
            const actualYear = Date.now().getFullYear();
            let updatePercentatge = 0.1 * (actualYear - this.year);
            
            //? Conseguimos el nuevo precio multiplicando el porcentaje por el precio original, porque el precio podría ya tener un descuento aplicdo, y el descuento del 10% por año siempre se realizará sobre el precio original
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