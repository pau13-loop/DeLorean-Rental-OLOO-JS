var Vehicle = {
    init: function(
        brand, model, color, price, category) {
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.price = price
        this.category = category;
        return this;
    },
    // GETTERS
    getBrand: function() {
        return `Vehicle brand: ${this.brand}`;
    },
    getModel: function() {
        return `Vehicle model: ${this.model}`;
    },
    getName: function() {
        return `Vehicle name: ${this.brand} ${this.model}`;
    },
    getColor: function() {
        return `Vehicle color: ${this.color}`;
    },
    getCategory: function() {
        return this.category;
    },
    getPrice: function() {
        return `Vehicle price: ${this.price}`;
    },
    // DATA MANIPULATION
    //? Porque si accedo al método getDiscountTax() me devuelve NaN ???
    updatePrice: function() {
        this.price = Math.floor((100 * this.category.discountTax) / this.price);
    },
    getUpdatedPrice: function() {
        return `Discount applied successfully! \nPrice: ${this.price}`;
    }
};

module.exports = Vehicle;