var Vehicle = {
    init: function (
        brand, model, color, price, category) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.price = price;
        this.category = category;
        //! No la qiuiero inicializar ahora, sino cuando reciba el precio de bd, así me ahorro un campo en la bd !!!
        Object.defineProperty(this, "originalPrice", {
            value: price,
            writeable: false,
            enumerable: false,
        });
        //? Donde explico que la regla de mi negocio no permite bajar el valor de los coches una vez llegué al 30% de su valor inicial ???
        Object.defineProperty(this, "minPrice", {
            value: price * 0.3,
            writeable: false,
            enumerable: false,
        });
        return this;
    },
    // GETTERS
    getBrand: function () {
        return `Vehicle brand: ${this.brand}`;
    },
    getModel: function () {
        return `Vehicle model: ${this.model}`;
    },
    getName: function () {
        return `Vehicle name: ${this.brand} ${this.model}`;
    },
    getColor: function () {
        return `Vehicle color: ${this.color}`;
    },
    getCategory: function () {
        return this.category;
    },
    getPrice: function () {
        return `Vehicle price: ${this.price}`;
    },
    // GETTERS NON ENUMREABLE OR WRITEABLE PROPS
    getOriginalPrice: function () {
        return 'Vehicle original price: ' + this.originalPrice;
    },
    getErrorMinPrice: function () {
        return 'Price can not go under minimum';
    },
    // DATA MANIPULATION
    /**
     * TODO: Revisar esto con atención
     //! Las validaciones se deberían hacer en el service y el objeto debería encapsular una lógica simple que solo sea llamada si se cumple la condición ??? Los if-else deberían ir en el service ?
     */
    //? Porque si accedo al método getDiscountTax() me devuelve NaN ???
    updatePrice: function () {
        //TODO: aplicar prog. defensiva, chequear que el precio no se puede descontar si es inferior al precioOriginal
        // Siempre el descuento será de un 5% en todos los vehiculos 
        if (this.price > this.minPrice) {
            this.price -= this.price * 0.1; 
        }
        else {
            return this.getErrorMinPrice();
        }
    },
    getDiscountedPrice: function () {
        return `Discount applied successfully! \nPrice: ${this.price}`;
    },
    applyDiscount: function () {
        if (this.price > this.minPrice) {
            this.price = Math.floor((100 * this.category.discountTax) / this.price);
        }
        else {
            return this.getErrorMinPrice();
        }
    }
};

module.exports = Vehicle;