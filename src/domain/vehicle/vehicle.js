var Vehicle = {
    init: function (
        brand, model, color, price, category, available) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.price = price;
        this.category = category;
        // Implementar getters y casos test aún //
        // fuel, seats, year, avaialble, characteristics
        // this.fuel = fuel;
        // this.passengers = passengers;
        // this.year = year;
        this.available = available;
        // this.characteristics = characteristics;
        //
        //! No la qiuiero inicializar ahora, sino cuando reciba el precio de bd, así me ahorro un campo en la bd !!!
        Object.defineProperty(this, "originalPrice", {
            value: price,
            writeable: false,
            enumerable: false,
        });
        //? Donde explico que la regla de mi negocio no permite bajar el valor de los coches una vez llegué al 30% de su valor inicial ???
        //TODO: creo que no hará falta utilizarla ya que se puede aplicar directamente sobre el precioOriginal, para saber si se puede descontar o no
        Object.defineProperty(this, "minPrice", {
            value: price * 0.3,
            writeable: false,
            enumerable: false,
        });
        return this;
    },
    // GETTERS
    getBrand: function () {
        return this.brand;
    },
    getModel: function () {
        return this.model;
    },
    getName: function () {
        return `Vehicle name: ${this.brand} ${this.model}`;
    },
    getColor: function () {
        return this.color;
    },
    getCategory: function () {
        return this.category;
    },
    getPrice: function () {
        return this.price;
    },
    getAvailability: function() {
        return this.available;
    },
    getDiscountedPrice: function () {
        return `Discount applied successfully! \nPrice: ${this.price}`;
    },
    // GETTERS NON ENUMREABLE OR WRITEABLE PROPS
    getOriginalPrice: function () {
        return this.originalPrice;
    },
    //TODO: el preicio mínimo no puede ser inferior al 30% del precio original
    //! Esta función sobra  ???
    getMinPrice: function() {
        return this.getOriginalPrice * 0.3;
    },
    // DATA MANIPULATION
    //? Porque si accedo al método getDiscountTax() me devuelve NaN ???
    updatePrice: function () {
        //TODO: aplicar prog. defensiva, chequear que el precio no se puede descontar si es inferior al precioOriginal
        // Siempre el descuento será de un 5% en todos los vehiculos cuando cumplena año
        //! Lo calculo directamente o accediendo al método getMinPrice() ???
        // let original = this.originalPrice;
        if (this.price > this.originalPrice * 0.3) {
            //* Al actualizar el precio queremos redondearlo
            this.price -= Math.round(this.price * 0.1); 
        }
    }
};

module.exports = Vehicle;