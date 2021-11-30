var Vehicle = {
    init: function (
        brand, model, price, category, year, available, characteristics) {
        this.brand = brand;
        this.model = model;
        // this.color = color;
        this.price = price;
        this.category = category;
        // this.fuel = fuel;
        // this.passengers = passengers;
        this.year = year;
        this.available = available;
        //
        // this.characteristics = characteristics;
        //
        //! No la qiuiero inicializar ahora, sino cuando reciba el precio de bd !!!
        Object.defineProperty(this, "originalPrice", {
            value: price,
            writeable: false,
            enumerable: false,
        });
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
        return this.originalPrice;
    },
    getName: function () {
        return `Vehicle name: ${this.brand} ${this.model}`;
    },
    getDiscountedPrice: function () {
        return `Discount applied successfully! \nPrice: ${this.price}`;
    },
    //TODO: el preicio mínimo no puede ser inferior al 30% del precio original
    //? Donde explico que la regla de mi negocio no permite bajar el valor de los coches una vez llegué al 30% de su valor inicial ???
    getMinPrice: function() {
        return this.originalPrice * 0.3;
    },
    //? Porque si accedo al método getDiscountTax() me devuelve NaN ???
    updatePrice: function () {
        // Siempre el descuento será de un 10% en todos los vehiculos cuando cumplena año
        let minPrice = this.getMinPrice();
        console.log('Min price: ', minPrice);
        if (this.price > this.getMinPrice()) {
            //* Al actualizar el precio queremos redondearlo
            this.price -= Math.round(this.price * 0.1); 
        }
    }
};

module.exports = Vehicle;